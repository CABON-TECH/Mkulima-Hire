import { useNavigate } from 'react-router-dom';
import done from '../../../assets/done.svg';
import Modal from 'react-modal';

const SuccessModal = ({
  modalIsOpen,
  setIsOpen,
}: {
  modalIsOpen: any;
  setIsOpen: any;
}) => {
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate('/worker-dashboard');
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: 'fixed',
          background: 'rgba(24, 49, 64, 0.63)',
          backdropFilter: 'blur("91px")',
          zIndex: 1,
        },
      }}
      className="bg-white flex flex-col mt-[5%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
      appElement={document.getElementById('root') || undefined}
    >
      <div className="flex justify-center">
        <img src={done} alt="job posted" className="w-40" />
      </div>
      <p className="text-xl text-center w-1/2 py-3">
        You have successfully submitted your application! The employer will be
        in touch for next steps!
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => closeModal()}
          className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 rounded-lg mt-5 disabled:opacity-50"
        >
          Close Modal
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
