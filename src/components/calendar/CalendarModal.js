import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import {
  eventStartAddNew,
  eventClearActivateEvent,
  eventsStartUpdated,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minute(0).seconds(0).add(1, 'hours');
const nowEnd = now.clone().add(1, 'hours');
const initFormValues = {
  title: 'Event',
  notes: '',
  start: now.toDate(),
  end: nowEnd.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initFormValues);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initFormValues);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //instanciamos moment
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('ERROR', 'fecha 2 invalida debe ser mayor', 'error');
      return;
    }

    if (title.trim().length < 2) {
      setTitleIsValid(false);
      return;
    }

    if (activeEvent) {
      dispatch(eventsStartUpdated(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleIsValid(true);
    dispatch(closeModal());
  };

  const HandleStartDateOnChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const HandleEndDateOnChange = (e) => {
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setFormValues(initFormValues);
    dispatch(eventClearActivateEvent());
  };
  return (
    <div>
      <Modal
        className="modal"
        overlayClassName="modal-fondo"
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <h1>{activeEvent ? 'Editar Evento' : 'Nuevo evento'}</h1>
        <hr />
        <form onSubmit={handleSubmit} className="container">
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={HandleStartDateOnChange}
              value={start}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={HandleEndDateOnChange}
              minDate={start}
              value={end}
              className="form-control"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!titleIsValid && 'is-invalid'}`}
              placeholder="T??tulo del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripci??n corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Informaci??n adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
