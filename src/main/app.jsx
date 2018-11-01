import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../common/template/calendar.css"
import DateRangePicker from 'react-daterange-picker';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import _ from "lodash";

const moment = extendMoment(originalMoment);

const stateDefinitions = {
  available: {
    color: "#ffffff",
    selectable: true,
    label: 'Available',
  },
  holiday: {
    color: '#ffd200',
    label: 'Holiday',
  },
  birthday: {
    color: '#4286f4',
    label: 'Birthday',
  },
  busy: {
    color: '#78818b',
    label: 'Busy',
  },
  anniversary: {
    color: '#f49741',
    label: 'Anniversary',
  },
};

const onSelect = (value, states) => {
  return (dispatch, getState) => {

    var selectedDate = moment(value.year() + "-" + (value.month() + 1) + "-" + value.date(), "YYYY-MM-DD");

    var editCategory = "available";
    getState().app.Dates.forEach(function (element) {
      if (element.range.contains(selectedDate)) {
        editCategory = element.state
      }
    });

    dispatch({
      type: 'SELECTED_DATE',
      payload: selectedDate
    });

    dispatch({
      type: 'SELECT_CATEGORY',
      payload: editCategory
    });
  }
};

const onSelectCategory = (event) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SELECT_CATEGORY',
      payload: event.target.value
    });
  }
};

const onSaveChanges = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVE_CHANGES',
      payload: {
        state: getState().app.SelectedCategory,
        range: moment.range(
          getState().app.SelectedDate,
          getState().app.SelectedDate
        ),
      }
    });
  }
};

const onCancelChanges = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CANCEL_CHANGES',
    });
  }
};

const NextYear = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'NEXT_YEAR',
    });
  }
};

const PreviousYear = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'PREVIOUS_YEAR',
    });
  }
};

const Current_Year = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CURRENT_YEAR',
    });
  }
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.disablepaginationArrow = this.disablepaginationArrow.bind(this);
    this.state = {
      value: moment()
    };
  }

  disablepaginationArrow() {
    return <div />;
  }

  render() {

    var showEditBox = <div />
    if (!_.isEmpty(this.props.SelectedDate)) {
      showEditBox = (
        <div className="card" role="dialog">
          <div className="card-dialog" role="document">
            <div className="card-content">
              <div className="card-header">
                <h5 className="card-title">{this.props.SelectedDate.format("MM/DD/YYYY")}</h5>
              </div>
              <div className="card-body">
                <p>Categories</p>
                <select onChange={this.props.onSelectCategory} value={this.props.SelectedCategory}>
                  <option value='available'>
                    Available
                  </option>
                  <option value='holiday'>
                    Holiday
                        </option>
                  <option value='birthday'>
                    Birthday
                        </option>
                  <option value='busy'>
                    Busy
                        </option>
                  <option value='anniversary'>
                    Anniversary
                        </option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.props.onSaveChanges}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={this.props.onCancelChanges}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      );
    }


    return (
      <div className="content" style={{ minHeight: 1300 }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <div className="row">
                  <button type="button" className="btn btn-secondary btn-lg" onClick={this.props.PreviousYear}><i className="fa fa-arrow-left m-1" /></button>
                  <h1 className="m-3">Calendar {this.props.CurrentYear.getFullYear()}</h1>
                  <button type="button" className="btn btn-secondary btn-lg" onClick={this.props.NextYear} ><i className="fa fa-arrow-right m-1" /></button>
                  <button type="button" className="btn btn-secondary btn-lg ml-2" onClick={this.props.Current_Year}><i className="fa fa-undo m-1" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="collum">
          <div className="row">
            <div className="col-sm-10">
              <div>
                <DateRangePicker
                  numberOfCalendars={12}
                  value={moment(this.props.CurrentYear)}
                  onSelect={this.props.onSelect}
                  initialFromValue={false}
                  initialMonth={0}
                  initialYear={this.props.CurrentYear.getFullYear()}
                  stateDefinitions={stateDefinitions}
                  dateStates={this.props.Dates}
                  defaultState="available"
                  selectionType="single"
                  disableNavigation={true}
                  paginationArrowComponent={this.disablepaginationArrow}
                  showLegend={true}
                />
              </div>
            </div>
            <div className="col-sm-2">
              {showEditBox}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  CurrentYear: state.app.CurrentYear,
  Dates: state.app.Dates,
  SelectedDate: state.app.SelectedDate,
  SelectedCategory: state.app.SelectedCategory
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSelect,
      onCancelChanges,
      onSaveChanges,
      onSelectCategory,
      NextYear,
      PreviousYear,
      Current_Year
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
