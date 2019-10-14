import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import LoadingSpinner from './LoadingSpinner';
import Select from 'react-select'

const MainForm = () => {
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [successModalStatus, setSuccessModalStatus] = useState(false);
    const [formError, setFormError] = useState(false);

    // field values with errors
    const [rangeValue, setRangeValue] = useState(4800);
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturerError, setManufacturerError] = useState(false);
    const [model, setModel] = useState('');
    const [modelError, setModelError] = useState(false);
    const [year, setYear] = useState('');
    const [yearError, setYearError] = useState(false);
    const [steering, setSteering] = useState('');
    const [steeringError, setSteeringError] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [idNum, setIdNum] = useState('');
    const [idNumError, setIdNumError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [checkBoxVal, setCheckBoxVal] = useState(false);
    const [checkBoxError, setCheckBoxError] = useState(false);

    // data for selects
    const manufacturer_options = [
        { value: 'Mercedes Benz', label: 'Mercedes Benz' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Audi', label: 'Audi' },
        { value: 'Toyota', label: 'Toyota' },
    ]

    const model_options = [
        { value: 'C300', label: 'C300' },
        { value: 'E320', label: 'E320' },
        { value: 'BMW 535', label: 'BMW 535' },
        { value: 'Toyota Prius', label: 'Toyota Prius' },
    ]

    const steering_options = [
        { value: 'მარცხენა', label: 'მარცხენა' },
        { value: 'მარჯვენა', label: 'მარჯვენა' }
    ]

    const year_options = [
        { value: 2019, label: 2019 },
        { value: 2018, label: 2018 },
        { value: 2017, label: 2017 },
        { value: 2016, label: 2016 },
        { value: 2015, label: 2015 },
        { value: 2014, label: 2014 },
        { value: 2013, label: 2013 },
        { value: 2012, label: 2012 },
        { value: 2011, label: 2011 },
        { value: 2010, label: 2010 },
        { value: 2009, label: 2009 },
        { value: 2008, label: 2008 },
        { value: 2007, label: 2007 },
        { value: 2006, label: 2006 },
        { value: 2005, label: 2005 },
    ]


    //Change handler functions
    const handleOnChange = (rangeValue) => {
        setRangeValue(rangeValue);
    }

    const onChange = (e, type) => {
        if (type === 'fullName') {
            setFullName(e.target.value);
        } else if (type === 'idNum') {
            setIdNum(e.target.value);
        } else if (type === 'phone') {
            setPhone(e.target.value);
        }
    }


    const onSelectFunc = (optionSelected, type) => {
        if (type === 'manufacturer') {
            setManufacturer(optionSelected.value);
        } else if (type === 'model') {
            setModel(optionSelected.value)
        } else if (type === 'year') {
            setYear(optionSelected.value)
        } else if (type === 'steering') {
            setSteering(optionSelected.value)
        }
    }

    // modal toggle functions
    const toggleModal = () => {
        setModalStatus(!modalStatus);
    }

    const toggleSuccessModal = () => {
        setSuccessModalStatus(!modalStatus);
    }

    // submit handler
    const handleSubmit = (e) => {
        //prevents default form submission
        e.preventDefault();

        manufacturer.length === 0 ? setManufacturerError(true) : setManufacturerError(false);

        model.length === 0 ? setModelError(true) : setModelError(false);

        year.length === 0 ? setYearError(true) : setYearError(false);

        steering.length === 0 ? setSteeringError(true) : setSteeringError(false);

        fullName.length === 0 ? setFullNameError(true) : setFullNameError(false);

        idNum.length === 0 ? setIdNumError(true) : setIdNumError(false);

        phone.length === 0 ? setPhoneError(true) : setPhoneError(false);

        checkBoxVal !== true ? setCheckBoxError(true) : setCheckBoxError(false);

        return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccessModalStatus(true);
        }, 3000)

    }

    return (
        <div style={{ position: 'relative' }}>
            <form className='mainForm'>
                {loading && <LoadingSpinner />}
                <div className='formHeader'>
                    <h3>განაცხადი</h3>
                    <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                        <DropdownToggle className='clickable' tag='div' style={{ color: dropdownOpen && '#DB1810' }}>
                            <img src={!dropdownOpen ? require('../assets/link.png') : require('../assets/link-red.png')} alt='nav' />
                            <span>შეავსე ლინკით</span>
                        </DropdownToggle>
                        <DropdownMenu className='insertLink'>
                            <p className='insertText'>შეიყვანეთ ავტომობილის ლინკი</p>
                            <span className='belowText'>(Myauto, Autopapa,Auto.ge)</span>
                            <input type='text' placeholder='ჩაწერეთ ლინკი' />
                            <button className='blackBtn'>ჩასმა</button>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className='rangeValContainer'>
                    <div className='rangeValInnerContainer'>
                        <p>თანხა</p>
                        <p className='rangeVal'>{rangeValue} $</p>
                    </div>
                    <Slider
                        min={100}
                        max={25000}
                        value={rangeValue}
                        step={100}
                        tooltip={false}
                        onChange={handleOnChange}
                    />
                </div>

                <div className='margin20'>
                    <div className='selectsContainer'>
                        <div className={`singleFormContainer ${manufacturerError && 'error'}`}>
                            <label htmlFor='name'>მწარმოებელი</label>
                            <Select
                                placeholder='აირჩიეთ'
                                value={manufacturer.value}
                                options={manufacturer_options}
                                className='customSelect'
                                onChange={(e) => onSelectFunc(e, 'manufacturer')}
                            />
                            {manufacturerError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                        </div>

                        <div className={`singleFormContainer ${modelError && 'error'}`}>
                            <label htmlFor='name'>მოდელი</label>
                            <Select
                                placeholder='აირჩიეთ'
                                value={model.value}
                                options={model_options}
                                className='customSelect'
                                onChange={(e) => onSelectFunc(e, 'model')}
                            />
                            {modelError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                        </div>
                    </div>
                </div>

                <div className='margin20'>
                    <div className='selectsContainer'>
                        <div className={`singleFormContainer ${yearError && 'error'}`}>
                            <label htmlFor='name'>გამოშვების წელი</label>
                            <Select
                                placeholder='აირჩიეთ'
                                value={year.value}
                                options={year_options}
                                className='customSelect'
                                onChange={(e) => onSelectFunc(e, 'year')}
                            />
                            {yearError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                        </div>

                        <div className={`singleFormContainer ${steeringError && 'error'}`}>
                            <label htmlFor='name'>საჭე</label>
                            <Select
                                placeholder='აირჩიეთ'
                                value={steering.value}
                                options={steering_options}
                                className='customSelect'
                                onChange={(e) => onSelectFunc(e, 'steering')}
                            />
                            {steeringError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                        </div>

                    </div>
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${fullNameError && 'error'}`}>
                        <label htmlFor='name'>სახელი და გვარი</label>
                        <input placeholder='ჩაწერეთ სრული სახელი' id='name' type='text' value={fullName} onChange={(e) => onChange(e, 'fullName')} />
                    </div>
                    {fullNameError && <p className='errorText'>ველის შევსება სავალდებულოა</p>}
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${idNumError && 'error'}`}>
                        <label htmlFor='personalNumber'>პირადი ნომერი</label>
                        <input placeholder='ჩაწერეთ პ. ნომერი' id='personalNumber' type='text' value={idNum} onChange={(e) => onChange(e, 'idNum')} />
                    </div>
                    {idNumError && <p className='errorText'>ველის შევსება სავალდებულოა</p>}
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${phoneError && 'error'}`}>
                        <label htmlFor='phone'>ტელეფონი</label>
                        <input placeholder='ჩაწერეთ ტელეფონი' id='phone' type='text' value={phone} onChange={(e) => onChange(e, 'phone')} />
                    </div>
                    {phoneError && <p className='errorText'>ველის შევსება სავალდებულოა</p>}
                </div>

                <div>
                    <label className="checkboxContainer">ვეთანხმები ლიბერთის
                        <input
                            type="checkbox" id="terms"

                            checked={checkBoxVal}
                            onChange={() => setCheckBoxVal(!checkBoxVal)}
                        />
                        <span className={`checkmark ${checkBoxError && 'error'}`} ></span>
                    </label><span
                        className={`${checkBoxError && 'errorForText'}`}
                        onClick={toggleModal}
                    >წესებსა და პირობებს</span>
                </div>
                <div>
                    <input type='submit' value='გაგზავნა' className='blackBtn sendBtn' onClick={handleSubmit} />
                </div>

            </form>


            <Modal
                isOpen={modalStatus}
                toggle={toggleModal}
                centered={true} >
                <ModalHeader>
                    წესები და პირობები
                </ModalHeader>
                <ModalBody className='termsText'>
                    <p> ინფორმაციული უსაფრთხოება ბოლო წლების ერთ-ერთი ყველაზე აქტუალური გამოწვევაა თანამედროვე მსოფლიოში. </p>
                    <br />
                    <p>ბოლო ათწლეულების ტექნოლოგიურმა პროგრესმა საგრძნობლად გაამარტივა თანამედროვე ადამიანის ყოველდღიური ყოფა.</p>
                    <p>დღეს, სმარტფონზე თითის დაჭერით შესაძლებელია ფინანსური აქტივების მსოფლიოს ნებისმიერ წერტილში გაგზავნა და ვიდეო ზარის მეშვეობით, რეალურ დროში საკონფერენციო ზარების განხორციელება უცხოელ პარტნიორებთან.</p>
                    <p>ასეთი არნახული ტემპებით მზარდი ციფრული ტექნოლოგიები, კომფორტულ სერვისებთან ერთად აჩენს ახალ შესაძლებლობებს თაღლითებისთვის, რომელთა მიზანი სხვების პირად ინფორმაციაზე წვდომის დაუფლებაა. </p>
                    <br />
                    <p>ამ გვერდზე არსებული რეკომენდაციები დაგეხმარებათ თაღლითური სქემებისგან თავის დაცვაში. რჩევების გათვალისწინებით, თქვენ საგრძნობლად შეამცირებთ თქვენი პირადი ინფორმაციის არასანქცირებული გამჟღავნების რისკს და ასეთი შემთხვევის დადგომის შემთხვევაში, მზად იქნებით სათანადოდ რეაგირებისთვის. </p>

                    <p>თუ თაღლითებმა თქვენი ან სხვის ინფორმაციაზე წვდომა მოიპოვეს, გთხოვთ დაუყოვნებლივ დაგვირეკოთ: 0322555500</p>
                </ModalBody>
                <ModalFooter>
                    <button className='blackBtn modalBtn' onClick={() => {
                        setCheckBoxVal(true);
                        setModalStatus(false);
                    }}>ვეთანხმები</button>
                </ModalFooter>
            </Modal>



            <Modal
                isOpen={successModalStatus}
                toggle={toggleSuccessModal}
                centered={true}
                style={{ maxWidth: 400 }}
            >
                <ModalBody className='successText'>
                    <img src={require('../assets/success.png')} alt='checkmark' />
                    <h4> განაცხადი გადაიგზავნა </h4>

                    <p>თქვენი განაცხადი წარმატებით გადაიგზავნა
მაქსიმუმ 1 სამუშაო დღეში ჩვენი ოპერატორი
დაგიკავშირდებათ და გაგაცნობთ</p>
                    <button className='blackBtn modalBtn' onClick={() => setSuccessModalStatus(false)}>მთავარ გვერდზე დაბრუნება</button>
                </ModalBody>
            </Modal>
        </div>

    )
}

export default MainForm;