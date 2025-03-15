export interface StateDataApi<T> {
  data: T;
  isLoading: boolean;
}
export interface ResponseApi<T> {
  current_page: number;
  data: T[];
  per_page: number;
  to: number;
  total: number;
  last_page?: number;
}
export interface RequestApi {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
  filter?: Record<string, string>;
}

export interface FormProps {
  id?: number | null;
  inDialog?: boolean;
}
export interface FormEmit {
  onClose: [void];
  onSuccess: [void];
  [key: string]: any[];
}
export interface Pagination {
  page: number;
  itemsPerPage: number;
  sortBy: {
    key: string;
    order: string;
  }[];
  filter: Record<string, string>;
}
