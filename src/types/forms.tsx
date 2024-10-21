export interface FormsType {
    handleSubmit: any,
    errors: any,
    register: any,
    onSubmit: any,
    isLoading: any,
    control?: any,
    setError?: any,
    watch?: any,
    reset?: any,
    resetField?: any
}

export interface RegisterFormFieldsType {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    phone_number: string
}

export interface LoginFormFieldsType {
    email: string,
    password: string
}

export interface AssignmentFormFieldsType {
    mission_title: string,
    introduction: string;
    mission_objectives: string,
    planned_activities: string,
    necessary_resources: string,
    conclusion: string
}

export interface AssignmentOMFormFieldsType {
  traveler: string;
  date: Date;
  starting_point: string;
  destination: string;
  date_hour: Date;
  Purpose_of_the_mission: string;
  name_of_the_hotel: string;
  room_rate: string;
  confirmation_number: number;
  date_hotel: Date;
  authorization_airfare: string,
  fund_speedkey: string,
  price: string
}

export interface requestAdvanceFormFieldsType {
    social_security_number: number,
    nationality: string,
    address: string,
    special_mailing_instruction: string,
    amount_requested: number,
    bank: string,
    branch: string,
    name: string,
    account_number: number,
    date_requested: Date,
    date_need_by: Date,
    purpose_of_travel: string,
    destination: string,
    location: string,
    per_diem_rate: string,
    daily_rating_coefficient: string,
    percentage_of_advance_required: string,
    total_amount: string,
    additional_costs: string,
    signature: string,
    other_details_hotel: string,
    other_logistical_requirments: string
}

export interface MissionReportFormFieldsType {
    date: Date,
    object: string,
    mission_location: string,
    name_of_missionary: string,
    mission_objectives: string,
    progress_of_activities: string,
    point_to_improve: string,
    strong_points: string,
    recommendations: string,
    next_steps: string
}

export interface PurchaseRequestFormFieldsType {
    item: string,
    quantity: string,
    unit_type: string,
    description: string,
    estimated_unit_price: string,
    estimated_total: string,
    notes: string,
    project_code: string,
    geo_code: string
}