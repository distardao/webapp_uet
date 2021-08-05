/* eslint-disable semi */
import React from 'react';
// import './bootstrap.css';
import Flat from '../../assets/images/Image_flag.png';
import { Image } from 'react-bootstrap'

function index() {
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
												<h1 className="h4 text-gray-900 mb-4">Chào mừng bạn trờ lại</h1>
											</div>
											<form className="user">
												<div className="form-group">
													<input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
												</div>
												<div className="form-group">
													<input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
												</div>
												<a href="/" style={{ backgroundColor: '#4E73DF', borderRadius: 10 }} className="btn btn-primary btn-block">
													Đăng nhập
												</a>
												<hr />
												<a href="/" style={{ backgroundColor: '#EA4335', borderRadius: 10 }} className="btn btn-danger btn-block">
													<i className="fab fa-google fa-fw" /> Đăng nhập với Google
												</a>
											</form>
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

export default index;

