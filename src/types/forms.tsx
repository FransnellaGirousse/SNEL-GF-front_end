export interface FormsType {
  handleSubmit: any;
  errors: any;
  register: any;
  onSubmit: any;
  isLoading: any;
  control?: any;
  setError?: any;
  watch?: any;
  reset?: any;
  resetField?: any;
  getValues?: (name?: string) => any;
  setValue?: (name: string, value: any, options?: any) => void;
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
  Purpose_of_the_mission: string;
  date_hour: Date;
  starting_point: string;
  destination: string;
  authorization_airfare: string;
  fund_speedkey: string;
  price: string;
  name_of_the_hotel: string;
  room_rate: string;
  confirmation_number: number;
  date_hotel: Date;
  other_details_hotel: string;
  other_logistical_requirments: string;
  tdr_id:number;
}

export interface requestAdvanceFormFieldsType {
  social_security_number: number;
  nationality: string;
  address: string;
  date_requested: Date;
  date_need_by: Date;
  special_mailing_instruction: string;
  purpose_of_travel: string;
  destination: string;
  location: string;
  per_diem_rate: string;
  daily_rating_coefficient: string;
  number_of_days: string;
  percentage_of_advance_required: string;
  total_amount: string;
  additional_costs_motif: string;
  additional_costs: string;
  total_sum: string;
  amount_requested: number;
  bank: string;
  branch: string;
  name: string;
  account_number: number;
  total_general: string;
  final_total:string;
}

export interface MissionReportFormFieldsType {
  date: Date;
  name_of_missionary: string;
  object: string;
  mission_location: string;
  mission_objectives: string;
  progress_of_activities: string;
  point_to_improve: string;
  strong_points: string;
  recommendations: string;
  next_steps: string;
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

export interface ExpenseFormFieldsType {
  paid: string;
  employee_number: number;
  purpose_of_travel: string;
  date: Date;
  description: string;
  fund_speedkey: string;
  ref: string;
  inMGA: string;
  exchangeRate: string;
  totalMGA: string;
}

export interface AccountFormFieldsType {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone_number: string;
  address: string;
}