import ApiService from './ApiService'

export async function apiGetProjectTasks<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/tasks',
        method: 'get',
    })
}

export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/customers',
        method: 'get',
        params,
    })
}

export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/customers/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetRolesPermissionsRoles<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/rbac/roles',
        method: 'get',
    })
}

export async function apiGetAllData<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/employee/total_field',
        method: 'get',
    })
}
