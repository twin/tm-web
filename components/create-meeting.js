// @flow
import * as React from 'react'
import { Form, Header } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import type { MeetingAttributes } from '../types'

const DATE_FORMAT = 'DD/MM/YYYY'

type Props = {
  onSubmit: (MeetingAttributes) => Promise<*>,
}

type State = {
  date: string,
  note: string,
  loading: boolean,
}

class CreateMeeting extends React.Component<Props, State> {
  state = {
    date: '',
    note: '',
    loading: false,
  }

  render() {
    const { date, note, loading } = this.state
    return (
      <Form onSubmit={this._handleSubmit}>
        <Header as="h2">
          Create Meeting
        </Header>
        <Form.Field
          autoComplete="off"
          control={DayPickerInput}
          format={DATE_FORMAT}
          id="date"
          label="Date"
          required
          value={date}
          onDayChange={(day) => {
            this.setState({ date: day.format(DATE_FORMAT) })
          }}
        />
        <Form.TextArea
          autoHeight
          id="note"
          label="Note"
          value={note}
          onChange={(event: SyntheticInputEvent<HTMLTextAreaElement>) => {
            this.setState({ note: event.target.value })
          }}
        />
        <Form.Button
          loading={loading}
          primary
          type="submit"
        >
          Create
        </Form.Button>
      </Form>
    )
  }

  _handleChangeField = (event: SyntheticInputEvent<HTMLElement>) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  _handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props
    const { date, note } = this.state
    event.preventDefault()
    this.setState({ loading: true })
    onSubmit({ date, note })
      .then(this._resetForm)
  }

  _resetForm = () => {
    this.setState({
      date: '',
      note: '',
      loading: false,
    })
  }
}

export default CreateMeeting