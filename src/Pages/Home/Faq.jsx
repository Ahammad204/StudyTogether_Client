import faqImg from '../../assets/Banner/faq.jpg'

const Faq = () => {
    return (
        <div>
            <h1 className="font-teko font-extrabold text-center text-7xl mb-3">FAQ</h1> <hr />
            <div className="md:flex mt-4 gap-20 ">
                <div >
                    <img className="w-full h-96 rounded-lg" src={faqImg} alt="" />
                </div>
                <div className="join join-vertical w-96 mt-7">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            How to create Assignment?
                        </div>
                        <div className="collapse-content">
                            <p>Click Your profile picture and click dashboard here your find create assignment tab.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            How to see Added assignment?
                        </div>
                        <div className="collapse-content">
                            <p>Click Your profile picture and click dashboard here your find Your added assignment tab</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            How to mark assignment?
                        </div>
                        <div className="collapse-content">
                            <p>Click Your profile picture and click dashboard here your find Your assignment submission user assignment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;