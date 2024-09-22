export interface FormsType {
    handleSubmit: any,
    errors: any,
    register: any,
    onSubmit: any,
    isLoading: boolean
}

export interface RegisterFormFieldsType {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    tel: number
}

export interface LoginFormFieldsType {
    email: string,
    password: string
}

export interface AssignmentFormFieldsType {
    mission_objectives: string,
    planned_activities: string,
    necessary_resources: string
}

export interface AssignmentOMFormFieldsType {
    traveler: string,
    date: Date,
    starting_point: string,
    destination: string,
    date_hour: Date,
    Purpose_of_the_mission: string,
    name_of_the_hotel: string,
    room_rate: string,
    confirmation_number: number,
    date_hotel: Date
}

export interface requestAdvanceFormFieldsType {
    informations: string,
    date: Date,
    per_diem_rate: string,
    daily_rating_coefficient: string,
    percentage_of_advance_required: string,
    total_amount: string,
    additional_costs: string,
    signature: string
}