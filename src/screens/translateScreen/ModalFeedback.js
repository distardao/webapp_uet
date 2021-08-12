/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function ModalFeedBack(props) {
	const {
		register, handleSubmit, formState: { errors },
	} = useForm();

	const ChangeInfo = () => {
		console.log('Phan hoi');
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
					Gửi phản hồi
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit(ChangeInfo)}>
				<Modal.Body>
					<div>
						{/* <p style={{ marginBottom: 0, color: '#808080' }}>
								Điền thông tin phản hồi
							</p> */}
						<textarea type="text" name="feedback" {...register('feedback', { required: true, maxLength: 300 })} placeholder='Điền thông tin phản hồi' style={{ borderColor: '#C4C4C4', borderStyle: 'solid', borderRadius: 7, width: '100%' }} />
						{errors.feedback && <span className="text-danger">Không được để trống</span>}
						{errors?.feedback?.type === 'maxLength' && (
							<p className="text-danger">Tên không được vượt quá 300 ký tự</p>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button type="summit" variant="primary">Gửi</Button>
					<Button variant="light" onClick={props.onHide}>Hủy</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ModalFeedBack;
