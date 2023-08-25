import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {MediaFile} from "../models/mediaFile";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient,
              public sanitizer: DomSanitizer,
  ) {
  }

  getImageURL(url: string | any[] | null | undefined, defaultImage?: string): any {
    if (url != null && url.length !== 0) {
      return environment.task_manager.URL_MEDIA + url;
    } else {
      return defaultImage ? defaultImage : 'assets/images/aca-logo.png';
    }
  }

  getPDFFile(url: string) {
    return this.httpClient.get(environment.task_manager.URL_MEDIA + url, {responseType: 'blob'})
  }

  getFile(url: string | any[] | null | undefined, defaultImage?: string): any {
    if (url != null && url.length !== 0) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('blob:'+environment.task_manager.URL_MEDIA + url);
    } else {
      return defaultImage ? this.sanitizer.bypassSecurityTrustResourceUrl(defaultImage) : 'assets/images/aca-logo.png';
    }
  }


  uploadMedia(file: File, type: string, description: string): Observable<HttpEvent<MediaFile>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('description', description);
    return this.httpClient.post<MediaFile>(environment.task_manager.API_URL + `/medias`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }


  validateFileSize(file: File): {
    validated: boolean,
    message: string
  } {
    let result = {
      validated: false,
      message: ""
    }
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB (5 Megabytes)
    if (file.size > maxSizeInBytes) {
      result.message = "File size exceeds the limit"
    } else {
      result.validated = true;
    }
    return result;
  }

  loadFile(selectedFiles: any, file: File, loadFileText: string, isLoadingFile: boolean = false) {
    if (selectedFiles == null || selectedFiles.length < 1) {
      return;
    }
    file = selectedFiles[0];


    if (!this.validateFileSize(file).validated) {
      return {
        sizeExceeds: true,
        file: file,
        loadFileText: loadFileText,
        isLoadingFile: isLoadingFile
      }
    }


    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    const extension = file.name.substring(
      file.name.lastIndexOf('.'),
      file.name.length
    );
    loadFileText =
      file.name.length <= 40
        ? file.name
        : file.name.substring(0, 35) + '..' + extension;
    isLoadingFile = true;
    return {
      sizeExceeds: false,
      file: file,
      loadFileText: loadFileText,
      isLoadingFile: isLoadingFile
    }
  }
}
