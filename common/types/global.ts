export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  hello: (message: string) => void;
}
