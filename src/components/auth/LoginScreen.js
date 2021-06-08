import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleInputLoginChange] = useForm({
    lEmail: 'javi@gmail.com',
    lPassword: '123456',
  });
  const [formRegisterValues, handleInputRegisterChange] = useForm({
    rName: 'Pepe',
    rEmail: 'Pepe@gmail.com',
    rPassword1: '123456',
    rPassword2: '123456',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Contraseñas deben de ser iguales', 'error');
    }
    dispatch(startRegister(rEmail, rPassword1, rName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <input
                name="lEmail"
                type="text"
                className="form-control"
                placeholder="Correo"
                value={lEmail}
                onChange={handleInputLoginChange}
              />
            </div>
            <div className="form-group">
              <input
                name="lPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={lPassword}
                onChange={handleInputLoginChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={rName}
                onChange={handleInputRegisterChange}
                name="rName"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={rEmail}
                onChange={handleInputRegisterChange}
                name="rEmail"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={rPassword1}
                onChange={handleInputRegisterChange}
                name="rPassword1"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={rPassword2}
                onChange={handleInputRegisterChange}
                name="rPassword2"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
