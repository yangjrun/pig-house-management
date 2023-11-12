export interface UploadApiResult {
  msg: string;
  code: number;
  data: {
    name: string;
    url: string;
    size: string;
    platform: string;
  };
}
