import {
    CHANGE_PLAN,
    CHANGE_PENDING,
    EQUIPMENT_PENDING,
    LOG_IN,
    LOG_OUT,
    CHANGE_PROFILE,
    CHANGE_PAYMENT,
    START_EDITING_EMAIL,
    END_EDITING_EMAIL
} from "./action";

const initialState = {
    planVersion: 0,
    planPendingVersion: 0,
    equipmentVersion: 0,
    profileVersion:0,
    loggedIn: false,
    hasPaymentVersion: 0,
    isEditingEmail: false
};

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case CHANGE_PLAN:
            return {
                ...state,
                planVersion: state.planVersion + 1,
                planPendingVersion: state.planPendingVersion + 1
            };
        case CHANGE_PENDING:
            return {
                ...state,
                planPendingVersion: state.planPendingVersion + 1
            };
        case EQUIPMENT_PENDING:
            return {
                ...state,
                planPendingVersion: state.planPendingVersion + 1,
                equipmentVersion: state.equipmentVersion + 1
            };
        case LOG_IN:
            return {
                ...state,
                loggedIn: true,
                hasPaymentVersion: state.hasPaymentVersion + 1
            }
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                hasPaymentVersion: state.hasPaymentVersion + 1
            }
        case CHANGE_PROFILE:
            return {
                ...state,
                profileVersion: state.profileVersion+1
            }
        case CHANGE_PAYMENT:
            return {
                ...state,
                hasPaymentVersion: state.hasPaymentVersion + 1
            }
        case START_EDITING_EMAIL:
            return {
                ...state,
                isEditingEmail: true
            }
        case END_EDITING_EMAIL:
            return {
                ...state,
                isEditingEmail: false
            }
        default:
            return state
    }
};

export default reducer
