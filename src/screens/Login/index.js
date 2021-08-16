/* eslint-disable semi */
import React from 'react';
// import './bootstrap.css';
import Flat from '../../assets/images/Image_flag.png';
import { Image } from 'react-bootstrap'
import LoginGoogle from './LoginGoogle'
import { useForm } from 'react-hook-form';

function Login() {
	const {
		register, handleSubmit, formState: { errors },
	} = useForm();

	const LoginNormal = () => {
		alert('Chưa thể đăng nhập')
	}
	return (
		<div style={{ height: '93.8vh', backgroundColor: '#4e73df' }}>
			<div className="container">
				{/* Outer Row */}
				<div className="row justify-content-center">
					<div className="col-xl-10 col-lg-12 col-md-9">
						<div className="card o-hidden border-0 shadow-lg my-5">
							<div className="card-body p-0">
								{/* Nested Row within Card Body */}
								<div className="row mr-0">
									<div className="col-lg-6 d-none d-lg-block" >
										<Image src={Flat} thumbnail />
									</div>
									<div className="col-lg-6 align-self-center">
										<div className="m-5">
											<div className="text-center">
												<h1 className="h4 text-gray-900 mb-5">Chào mừng bạn trờ lại</h1>
											</div>
											<form className="user" onSubmit={handleSubmit(LoginNormal)}>
												<div className="form-group">
													<input type="email"   {...register('account', { required: true })} style={{ height: 50, borderRadius: 15 }} className="mb-4 form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
													{errors.account && <span className="text-danger">Trường này là bắt buộc</span>}
												</div>
												<div className="form-group">
													<input type="password"  {...register('password', { required: true })} style={{ height: 50, borderRadius: 15 }} className="mb-4 form-control" id="exampleInputPassword" placeholder="Password" />
													{errors.password && <span className="text-danger">Trường này là bắt buộc</span>}
												</div>
												<button type="summit" style={{ backgroundColor: '#4E73DF', borderRadius: 10 }} className="btn btn-primary btn-block">
													Đăng nhập
												</button>
												<hr />
											</form>
											<LoginGoogle />
											<hr />
											<div className="text-center">
												<a className="small" href="/forgot-password">Quên mật khẩu?</a>
											</div>
											<div className="text-center">
												<a className="small" href="/register">Có tài khoản? Đăng ký!</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;

