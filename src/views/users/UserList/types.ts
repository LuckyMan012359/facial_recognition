import type { KeyedMutator } from 'swr'

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    dialCode: string
    address: string
    postcode: string
    city: string
    country: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type GetCustomersListResponse = {
    list: Customer[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Customer = {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
    orderHistory: OrderHistory[]
    paymentMethod: PaymentMethod[]
    subscription: Subscription[]
    totalSpending: number
}

export type User = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
}

export type Users = User[]

export type RoleFilter = {
    role?: string
    status?: string
}

export type Role = {
    id: string
    name: string
    description: string
    users: Pick<User, 'id' | 'name' | 'email' | 'role' | 'img'>[]
    accessRight: Record<string, string[]>
}

export type Roles = Role[]

export type GetRolesPermissionsRolesResponse = Roles

export type MutateRolesPermissionsRolesResponse =
    KeyedMutator<GetRolesPermissionsRolesResponse>
