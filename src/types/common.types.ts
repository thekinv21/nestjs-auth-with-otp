export interface IBaseType {
	createdAt?: Date
	updatedAt?: Date
}

export type IApiResponse<T> = {
	isSuccess: boolean
	status: number
	path: string
	message?: string | Array<{ message: string }>
	timestamp: string
	content: T
}

export type IPaginationApiResponse<T> = {
	isSuccess: boolean
	status: number
	path: string
	message?: string | Array<{ message: string }>
	timestamp: string
	total: number
	page: number
	pageSize: number
	isFirstPage: boolean
	isLastPage: boolean
	isEmpty: boolean
	totalPages: number
	content: T[]
}
