const INITIAL_STATE = {
    CurrentYear: new Date(),
    Dates: [],
    SelectedDate: "",
    SelectedCategory: "available"
}

const changeDates = (changedDate, Dates) => {
    var datesUpdated = Dates.slice();
    var editElementIndex = -1;
    datesUpdated.forEach(function (element) {
        if (element.range.contains(changedDate.range)) {
            element.state = changedDate.state;
            editElementIndex = datesUpdated.indexOf(element);
        }
    });

    if (editElementIndex == -1 && changedDate.state != 'available') {
        datesUpdated.push(changedDate);
    } else if (editElementIndex != -1 && changedDate.state == 'available') {
        datesUpdated.splice(editElementIndex, 1);
    }
    return datesUpdated
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEXT_YEAR':
            var year = state.CurrentYear.getFullYear();
            return {
                ...state,
                CurrentYear: new Date(year + 1, 0, 1)
            }
        case 'PREVIOUS_YEAR':
            var year = state.CurrentYear.getFullYear();
            return {
                ...state,
                CurrentYear: new Date(year - 1, 0, 1)
            }
        case 'CURRENT_YEAR':
            var year = new Date().getFullYear();
            return {
                ...state,
                CurrentYear: new Date(year, 0, 1)
            }
        case 'SELECTED_DATE':
            return {
                ...state,
                SelectedDate: action.payload
            }
        case 'SELECT_CATEGORY':
            return {
                ...state,
                SelectedCategory: action.payload
            }
        case 'CANCEL_CHANGES':
            return {
                ...state,
                SelectedDate: {},
                SelectedCategory: "available"
            }
        case 'SAVE_CHANGES':
            return {
                ...state,
                Dates: changeDates(action.payload, state.Dates),
                SelectedDate: {},
                SelectedCategory: "available"
            }
        default:
            return state
    }
}