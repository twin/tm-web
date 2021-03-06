import React, { PropTypes } from 'react';
import MeetingItem from './MeetingItem';
import * as propTypes from '../prop-types';

const MeetingList = (props) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>{'Datum'}</th>
      </tr>
    </thead>
    <tbody>
      {props.list.map((meeting, i) => (
        <MeetingItem
          key={i}
          id={meeting.id}
          {...meeting.attributes}
          onClick={props.onClick}
        />
      ))}
    </tbody>
  </table>
);

MeetingList.propTypes = {
  list: PropTypes.arrayOf(propTypes.meeting).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MeetingList;
