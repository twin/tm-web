import React, { PropTypes } from 'react';
import moment from 'moment';

moment.locale('hr');

class Meetings extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((meeting, i) => (
            <tr key={i}>
              <td>{`#${i + 1}`}</td>
              <td>
                {
                  moment(meeting.attributes.date)
                    .format('do MMMM')
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Meetings;
