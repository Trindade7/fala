interface Store {
    loading: boolean;
    status: string;
    error: Error | null;
}