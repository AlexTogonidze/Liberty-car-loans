import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import InputMask from 'react-input-mask';
import ReactGA from 'react-ga';

const MainForm = () => {
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [successModalStatus, setSuccessModalStatus] = useState(false);


    var urlParams = new URLSearchParams(window.location.search);

    let steeringParam;

    if (urlParams.get('drive_type') == 1) {
        steeringParam = 'მარცხნივ';
    } else if (urlParams.get('drive_type') == 2) {
        steeringParam = 'მარჯვნივ';
    }

    // field values with errors
    const [rangeValue, setRangeValue] = useState(urlParams.get('price'));
    const [rangeValueError, setRangeValueError] = useState(false);
    const [manufacturer, setManufacturer] = useState(urlParams.get('manufacturer'));
    const [manufacturerError, setManufacturerError] = useState(false);
    const [model, setModel] = useState(urlParams.get('model'));
    const [modelError, setModelError] = useState(false);
    const [year, setYear] = useState(urlParams.get('year_built'));
    const [yearError, setYearError] = useState(false);
    const [steering, setSteering] = useState(steeringParam);
    const [steeringError, setSteeringError] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [idNum, setIdNum] = useState('');
    const [idNumError, setIdNumError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [checkBoxVal, setCheckBoxVal] = useState(false);
    const [checkBoxError, setCheckBoxError] = useState(false);
    const [linkVal, setLinkVar] = useState('');
    const source = urlParams.get('utm_source') ? urlParams.get('utm_source') : 'direct';


    useEffect(() => {
        return;
    }, [modelError]);


    //Change handler functions
    const handleOnChange = (rangeValue) => {
        setRangeValue(rangeValue);
    }

    const onChange = (e, type) => {
        if (type === 'fullName') {
            setFullName(e.target.value);
        } else if (type === 'idNum') {
            if (e.target.value.length <= 11) {
                setIdNum(e.target.value);
            }
        } else if (type === 'phone') {
            setPhone(e.target.value);
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

        ReactGA.event({
            category: 'Autoloan',
            action: 'Click',
            label: 'Send Lead'
          });

        !rangeValue ? setRangeValueError(true) : setRangeValueError(false);

        fullName.length === 0 ? setFullNameError(true) : setFullNameError(false);

        idNum.length < 11 ? setIdNumError(true) : setIdNumError(false);

        phone.length === 0 ? setPhoneError(true) : setPhoneError(false);

        checkBoxVal !== true ? setCheckBoxError(true) : setCheckBoxError(false);

        !model ? setModelError(true) : setModelError(false);

        !year ? setYearError(true) : setYearError(false);

        !manufacturer ? setManufacturerError(true) : setManufacturerError(false);

        !steering ? setSteeringError(true) : setSteeringError(false);




        let shouldRun;
        let shouldRunWithoutCarInfo;

        if (year && phone.length && idNum.length && fullName.length && checkBoxVal && steering && model && manufacturer && rangeValue && source) {
            shouldRun = true;
        } else if (phone.length && idNum.length && fullName.length && checkBoxVal && source && rangeValue) {
            shouldRunWithoutCarInfo = true;
        }

        if (shouldRun || shouldRunWithoutCarInfo) {


            setLoading(true);

            axios({
                method: 'post',
                url: 'https://api.airtable.com/v0/appsogipiPBFjrFPc/Table%201?api_key=keyR0tISIz2CBY1F0',
                data: {
                    fields: {
                        "Full Name": fullName,
                        "Phone": phone,
                        "ID": idNum,
                        "Amount": rangeValue.toString(),
                        "Manufacturer": manufacturer,
                        "Car Model": model,
                        "Production Year": year,
                        "Steering Wheel": steering,
                        "Source": source
                    }

                }
            }).then((response) => {
                if (response) {
                    setLoading(false);
                    setSuccessModalStatus(true);
                } else {
                    setLoading(false);
                    alert('დაფიქსირდა შეცდომა, სცადეთ თავიდან')
                }
            }).finally(
                (err) => {
                    console.log(err);
                }
            );

        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <form className='mainForm'>
                {loading && <LoadingSpinner />}
                <div className='formHeader'>
                    <h1>ავტოსესხის განაცხადი</h1>
                    {/* <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
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
                    </Dropdown> */}
                </div>

                <div className='rangeValContainer'>
                    <div className='rangeValInnerContainer'>
                        <p>თანხა</p>
                        <div>
                            <input
                                autoFocus={true}
                                max="100000"
                                pattern="^[0-9]*$"
                                className='priceInput'
                                placeholder='თანხა'
                                value={rangeValue} onChange={e => {
                                    if (e.target.value.length <= 6)
                                        setRangeValue(e.target.value)
                                }} /> <img src={require('../assets/lari.svg')} style={{ width: 16, marginTop: -4 }} alt='GEL sign' />
                        </div>
                    </div>
                    {rangeValueError && <p className='errorText' style={{ marginLeft: 130, marginBottom: 10 }}>გთხოვთ მიუთითოთ სასურველი თანხა</p>}
                    <Slider
                        min={100}
                        max={100000}
                        value={rangeValue}
                        step={100}
                        tooltip={false}
                        onChange={handleOnChange}
                    />
                </div>


                <div className={!manufacturer && !model ? null : `margin20`}>
                    <div className='selectsContainer'>
                        {!!manufacturer &&
                            <div className={`singleFormContainer ${manufacturerError && 'error'}`}>
                                <label htmlFor='name'>მწარმოებელი</label>
                                <p className='carVal'>{manufacturer}</p>
                                {manufacturerError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                            </div>
                        }

                        {!!model &&
                            <div className={`singleFormContainer ${modelError && 'error'}`}>
                                <label htmlFor='name'>მოდელი</label>

                                <p className='carVal'>{model}</p>
                                {modelError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                            </div>
                        }
                    </div>
                </div>


                <div className='margin20'>
                    <div className='selectsContainer'>
                        {!!year &&
                            <div className={`singleFormContainer ${yearError && 'error'}`}>
                                <label htmlFor='name'>გამოშვების წელი</label>
                                <p className='carVal'>{year}</p>
                                {yearError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                            </div>
                        }

                        {!!steering &&
                            <div className={`singleFormContainer ${steeringError && 'error'}`}>
                                <label htmlFor='name'>საჭე</label>
                                <p className='carVal'>{steering}</p>
                                {steeringError && <p className='errorText'>არჩევა სავალდებულოა</p>}
                            </div>
                        }
                    </div>
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${fullNameError && 'error'}`}>
                        <label htmlFor='name'>სახელი და გვარი</label>
                        <input placeholder='ჩაწერეთ სახელი გვარი' id='name' type='text' value={fullName} onChange={(e) => onChange(e, 'fullName')} />
                    </div>
                    {fullNameError && <p className='errorText'>ველის შევსება სავალდებულოა</p>}
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${idNumError && 'error'}`}>
                        <label htmlFor='personalNumber'>პირადი ნომერი</label>

                        <input placeholder='პ. ნომერი - 11 სიმბოლო' id='personalNumber' type='text' value={idNum} onChange={(e) => onChange(e, 'idNum')} />
                    </div>
                    {idNumError && <p className='errorText'>ველის შევსება სავალდებულოა</p>}
                </div>

                <div className='margin20'>
                    <div className={`singleFormContainer ${phoneError && 'error'}`}>
                        <label htmlFor='phone'>ტელეფონი</label>
                        <InputMask placeholder='ჩაწერეთ ტელეფონი' id='phone' type='text' value={phone} onChange={(e) => onChange(e, 'phone')} mask="999 99 99 99" maskChar=" " />
                        {/* <input placeholder='ჩაწერეთ ტელეფონი' id='phone' type='text' value={phone} onChange={(e) => onChange(e, 'phone')} /> */}
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

                    <p> ვადასტურებ, რომ ჩემს მიერ მითითებული მონაცემები არის უტყუარი, სრული და მოქმედი. </p>
                    <br />
                    <p>გავეცანი სს „ლიბერთი ბანკის“ პერსონალურ მონაცემთა დაცვის პოლიტიკას, რომელიც განთავსებულია ბანკის ვებ გვერდზე და სრულად ვეთანხმები მის პირობებს. თანახმა ვარ სს „ლიბერთი ბანკმა“ დაამუშავოს ჩემს მიერ წინამდებარე განაცხადის ფორმაში მითითებული პირადი მონაცემები საბანკო მომსახურების განხორციელების მიზნით, მათ შორის პირდაპირი მარკეტინგის მიზნითაც, რაც გულისხმობს ჩემთვის სარეკლამო შეთავაზებების გამოგზავნას* მოკლე ტექსტური შეტყობინების ან ელ ფოსტის საშუალებით. *სარეკლამო შეთავაზებების მიღების გაუქმება შესაძლებელია ნებისმიერ დროს.</p>
                    <br />
                    <p>ამისათვის, საკმარისია მობილური ტელეფონით გაგზავნოთ მოკლე ტექსტური შეტყობინება (SMS) ტექსტით NOSMS ნომერზე 91036 (SMS რეკლამის ავტომატური გათიშვის მოთხოვნისთვის), დააჭიროთ შეთავაზების გამოწერის გაუქმების ბმულს ელ ფოსტით მიღებულ შეტყობინებაში (ელ ფოსტის რეკლამის ავტომატური გათიშვის მოთხოვნით) <br /> ან დაგვირეკოთ ცხელ ხაზზე: <b>0322 55 55 00</b> </p>
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
                    <button className='blackBtn modalBtn' onClick={() => {
                        setSuccessModalStatus(false);
                        window.location.href = 'https://libertybank.ge/'
                    }
                    }>მთავარ გვერდზე დაბრუნება</button>
                </ModalBody>
            </Modal>
        </div>

    )
}

export default MainForm;