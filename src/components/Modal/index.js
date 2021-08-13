/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function ModalInfo(props) {
	const {
		register, handleSubmit, formState: { errors },
	} = useForm();

	const ChangeInfo = () => {
		alert('Server chưa hỗ trợ');
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header style={{ backgroundColor: '#34639E' }}>
				<Modal.Title style={{ color: '#fff' }} id="contained-modal-title-vcenter">
					Thông tin cá nhân
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit(ChangeInfo)}>
				<Modal.Body>
					<div>
						<div style={{ display: 'flex' }}>
							<p style={{ marginBottom: 0 }}>
								Tên
							</p>
							<p style={{ marginLeft: 5, marginBottom: 0, color: 'red', fontSize: 20 }}>
								*
							</p>
						</div>
						<input type="text" name="name" {...register('name', { required: true, maxLength: 40 })} style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.name && <span className="text-danger">Trường này là bắt buộc</span>}
						{errors?.name?.type === 'maxLength' && (
							<p className="text-danger">Tên không được vượt quá 40 ký tự</p>
						)}
					</div>
					<div>
						<div style={{ display: 'flex' }}>
							<p style={{ marginBottom: 0 }}>
								Email
							</p>
							<p style={{ marginLeft: 5, marginBottom: 0, color: 'red', fontSize: 20 }}>
								*
							</p>
						</div>
						<input type="text" name="email" {...register('email', { required: true })} style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.email && <span className="text-danger">Trường này là bắt buộc</span>}
					</div>
					<div>
						<div style={{ display: 'flex' }}>
							<p style={{ marginBottom: 0 }}>
								Mật khẩu cũ
							</p>
						</div>
						<input type="password" name="password" {...register('password', { required: true, minLength: 6, pattern: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/ })} style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.password?.type === 'required' && <span className="text-danger">Không được để trống</span>}
						{errors.password?.type === 'minLength' && <span className="text-danger">Tối thiểu phải 6 ký tự</span>}
						{errors.password?.type === 'pattern' && <span className="text-danger">Mật khẩu chưa đủ phức tạp</span>}
					</div>
					<div>
						<div style={{ display: 'flex' }}>
							<p style={{ marginBottom: 0 }}>
								Mật khẩu mới
							</p>
						</div>
						<input type="password" name="newPassword" {...register('newPassword', { required: true, minLength: 6, pattern: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/ })} style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.newPassword?.type === 'required' && <span className="text-danger">Không được để trống</span>}
						{errors.newPassword?.type === 'minLength' && <span className="text-danger">Tối thiểu phải 6 ký tự</span>}
						{errors.newPassword?.type === 'pattern' && <span className="text-danger">Mật khẩu chưa đủ phức tạp</span>}
					</div>
					<div>
						<div style={{ display: 'flex' }}>
							<p style={{ marginBottom: 0 }}>
								xác nhận mật khẩu mới
							</p>
						</div>
						<input type="password" name="reNewPassword" {...register('reNewPassword', { required: true, minLength: 6, pattern: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$/ })} style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.reNewPassword?.type === 'required' && <span className="text-danger">Không được để trống</span>}
						{errors.reNewPassword?.type === 'minLength' && <span className="text-danger">Tối thiểu phải 6 ký tự</span>}
						{errors.reNewPassword?.type === 'pattern' && <span className="text-danger">Mật khẩu chưa đủ phức tạp</span>}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button type="summit" variant="primary">Thay đổi</Button>
					<Button variant="light" onClick={props.onHide}>Hủy</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ModalInfo;
