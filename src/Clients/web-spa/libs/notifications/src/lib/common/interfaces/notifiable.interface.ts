export interface Notifiable {
  start(): Promise<void>;

  /**
   * @deprecated The method shouldn't be used.
   */
  publish(notification: string): void;
}
