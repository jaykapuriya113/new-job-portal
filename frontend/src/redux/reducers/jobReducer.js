import {
  ADMIN_JOB_LOAD_FAIL,
  ADMIN_JOB_LOAD_REQUEST,
  ADMIN_JOB_LOAD_RESET,
  ADMIN_JOB_LOAD_SUCCESS,
  DELETE_JOB_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_RESET,
  DELETE_JOB_SUCCESS,
  EDIT_JOB_FAIL,
  EDIT_JOB_REQUEST,
  EDIT_JOB_RESET,
  EDIT_JOB_SUCCESS,
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_RESET,
  JOB_LOAD_SINGLE_FAIL,
  JOB_LOAD_SINGLE_REQUEST,
  JOB_LOAD_SINGLE_RESET,
  JOB_LOAD_SINGLE_SUCCESS,
  JOB_LOAD_SUCCESS,
  REGISTER_JOB_FAIL,
  REGISTER_JOB_REQUEST,
  REGISTER_JOB_RESET,
  REGISTER_JOB_SUCCESS,
  SHOW_COMPANY_JOB_FAIL,
  SHOW_COMPANY_JOB_REQUEST,
  SHOW_COMPANY_JOB_RESET,
  SHOW_COMPANY_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_RESET,
  UPDATE_JOB_SUCCESS,
  USER_APPLY_JOB_FAIL,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_RESET,
  USER_APPLY_JOB_SUCCESS,
} from "../constants/jobConstant";

export const loadJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
    case JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueLocation: action.payload.setUniqueLocation,
        setUniqueCategory: action.payload.setUniqueCategory,
        jobs: action.payload.jobs,
        minSalary: action.payload.minSalary,
        maxSalary: action.payload.maxSalary,
      };
    case JOB_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_RESET:
      return {};
    default:
      return state;
  }
};
// single job reducer
export const loadJobSingleReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_LOAD_SINGLE_REQUEST:
      return { loading: true };
    case JOB_LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        singleJob: action.payload.job,
      };
    case JOB_LOAD_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case JOB_LOAD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};

//Registred job;
export const registerAjobReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_JOB_REQUEST:
      return { loading: true };
    case REGISTER_JOB_SUCCESS:
      return {
        loading: false,
        job: action.payload,
      };
    case REGISTER_JOB_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_JOB_RESET:
      return {};
    default:
      return state;
  }
};
//delete job;
export const deleteAjobReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOB_REQUEST:
      return { loading: true };
    case DELETE_JOB_SUCCESS:
      return {
        loading: false,
        job: action.payload,
      };
    case DELETE_JOB_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_JOB_RESET:
      return {};
    default:
      return state;
  }
};

export const adminJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case ADMIN_JOB_LOAD_REQUEST:
      return { loading: true };
    case ADMIN_JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        jobs: action.payload.jobs,
      };
    case ADMIN_JOB_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_JOB_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const editJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case EDIT_JOB_REQUEST:
      return { loading: true };
    case EDIT_JOB_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        jobs: action.payload.jobs,
      };
    case EDIT_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_JOB_RESET:
      return {};
    default:
      return state;
  }
};

export const useApplyLoadJobReducer = (
  state = { jobs: [], jobStatusArr: [] },
  action
) => {
  // console.log(success)
  switch (action.type) {
    case USER_APPLY_JOB_REQUEST:
      return { loading: true };
    case USER_APPLY_JOB_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        jobStatusArr: action.payload,
        jobs: action.payload.jobs,
      };
    case USER_APPLY_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_APPLY_JOB_RESET:
      return {};
    default:
      return state;
  }
};
export const showAllJobsCreatedByCompanyReducer = (
  state = { jobs: [] },
  action
) => {
  switch (action.type) {
    case SHOW_COMPANY_JOB_REQUEST:
      return { loading: true };
    case SHOW_COMPANY_JOB_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        jobs: action.payload.jobs,
      };
    case SHOW_COMPANY_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHOW_COMPANY_JOB_RESET:
      return {};
    default:
      return state;
  }
};

export const updateJobStatusReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case UPDATE_JOB_REQUEST:
      return { loading: true };
    case UPDATE_JOB_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        jobs: action.payload.jobs,
      };
    case UPDATE_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_JOB_RESET:
      return {};
    default:
      return state;
  }
};
