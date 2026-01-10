export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  avatar?: string;
  responseCode?: number;
}
