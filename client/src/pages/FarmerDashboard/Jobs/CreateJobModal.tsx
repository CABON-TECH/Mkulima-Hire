import Modal from 'react-modal';
import done from '../../../assets/done.svg';

const CreateJobModal = ({
  modalIsOpen,
  closeModal,
}: {
  modalIsOpen: any;
  closeModal: any;
}) => {
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
      className="bg-white flex flex-col mt-[10%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
      appElement={document.getElementById('root') || undefined}
    >
      <div className="flex justify-center">
        <img src={done} alt="job posted" className="w-40" />
      </div>
      <p className="text-xl text-center w-1/2 py-3">
        You have successfully created a job posting! Now, wait for applications
        to start rolling in!
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => closeModal()}
          className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 rounded-lg mt-5 disabled:opacity-50"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CreateJobModal;
