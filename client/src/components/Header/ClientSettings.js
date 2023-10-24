import React, { useState, useEffect } from 'react';
import { Button, Col, Collapse, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Select from 'react-select';

export default function ClientSettings(props) {
    const [distanceInput, setDistanceInput] = useState(props.clientSettings.distanceUnits);
    const [validRadius, setValidRadius] = useState(true);
    const [radiusInput, setRadiusInput] = useState('');

    const inputOptions = { units: {input: JSON.stringify(distanceInput), setInput: (unit) => setDistanceInput(JSON.parse(unit))}, }
                            
    const newClientSettings = { distanceUnits: distanceInput }

    const closeModal = () => resetClientModal(inputOptions, props.clientSettings, props.toggleOpen);

    useEffect(() => { setRadiusInput(distanceInput.earthRadius.toString()); }, [distanceInput]);

    useEffect(() => {
        props.refreshDistances();
    }, [props.clientSettings.distanceUnits.earthRadius])

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            <ClientSettingsHeader toggleOpen={closeModal} />
            <ClientSettingsBody
                inputOptions={inputOptions}
                distanceInput={distanceInput} setDistanceInput={setDistanceInput}
                validRadius={validRadius} setValidRadius={setValidRadius}
                radiusInput={radiusInput} setRadiusInput={setRadiusInput}
                toggleOpen={props.toggleOpen} closeModal={closeModal}
                newClientSettings={newClientSettings} 
                processClientConfigSuccess={props.processClientConfigSuccess}
            />
        </Modal>
    );
}

function ClientSettingsHeader(props) {
    return (
        <ModalHeader className='clientSettingsModalHeader' toggle={props.toggleOpen}>
            Preferences
        </ModalHeader>
    );
}

function ClientSettingsBody(props) {
    const dropdownOptions = getDropdownOptions(props.inputOptions);

    const [isCustom, toggleCustom] = useState(props.distanceInput.unitType === 'Custom Units' ? true : false);

    useEffect(() => { toggleCustom(props.distanceInput.unitType === 'Custom Units' ? true : false); }, [props.distanceInput]);

    return (
        <>
            <ModalBody>
                {dropdownOptions.map((dropdownOption) =>
                    <ClientSettingsRow dropdownInfo={dropdownOption} />
                )}
                <CustomUnitsInput
                    isOpen={isCustom}
                    radiusInput={props.radiusInput} setRadiusInput={props.setRadiusInput}
                    setDistanceInput={props.setDistanceInput}
                    validRadius={props.validRadius} setValidRadius={props.setValidRadius}
                />
            </ModalBody>
            <ClientSettingsFooter
                toggleOpen={props.toggleOpen} closeModal={props.closeModal}
                processClientConfigSuccess={props.processClientConfigSuccess}
                newClientSettings={props.newClientSettings}
                validRadius={props.validRadius}
            />
        </>
    );
}

function ClientSettingsRow(props) {
	return (
        <Container key={`${props.dropdownInfo.type}-settings-row`}>
    		<Row className=''>
	    	    <Col xs={6}>
	        		{props.dropdownInfo.label}:
	    	    </Col>
        		<Col xs={6}>
	    		    <div>
                        <ClientSettingsDropdown
                            {...props}
                        />
                    </div>
	    	    </Col>
    		</Row>
            <br />
        </Container>
	);
}

function ClientSettingsDropdown(props) {
    
    return (
        <Select
            name={`${props.dropdownInfo.type}`}
            aria-label={`${props.dropdownInfo.type}-dropdown`}
            type='select'
			value={props.dropdownInfo.options.filter(obj => {
                if (props.dropdownInfo.type == 'units') {
                    return JSON.parse(obj.value).unitType == JSON.parse(props.dropdownInfo.input).unitType;
                }
                else {
                return obj.value == props.dropdownInfo.input;
                }
            })}
			onChange={(e) => { props.dropdownInfo.setInput(e.value); }}
            options={props.dropdownInfo.options}
		/>
    );
}

function CustomUnitsInput(props) {

    useEffect(() => {
        props.setValidRadius(verifyRadius(props.radiusInput));
        if (props.isOpen && props.validRadius) props.setDistanceInput({unitType: 'Custom Units', earthRadius: parseFloat(props.radiusInput)});
    }, [props.radiusInput]);

    return (
        <Collapse isOpen={props.isOpen}>
            <Container>
                <Row>
                    <Col xs={6}>Earth Radius:</Col>
                    <Col xs={6}>
                        <Input
                            data-testid={'custom-input'}
                            value={props.radiusInput}
                            onChange={(e) => {props.setRadiusInput(e.target.value)}}
                            valid={props.validRadius}
                            invalid={!props.validRadius}
                        />
                    </Col>
                </Row>
            </Container>
        </Collapse>
    )
}

function ClientSettingsFooter(props) {
    const handleSave = (e) => {
        props.processClientConfigSuccess(props.newClientSettings);
        props.toggleOpen();
    };

    return (
        <ModalFooter>
            <Button color='secondary' onClick={props.closeModal}>Cancel</Button>
            <Button 
                color='primary' 
                onClick={handleSave}
                disabled={!props.validRadius}
            >
                Save
            </Button>
        </ModalFooter>
    );
}

function getDropdownOptions(inputOptions) {
    const distanceUnits = JSON.parse(inputOptions.units.input);
    const customRadius = distanceUnits.unitType === 'Custom Units' ? distanceUnits.earthRadius : 0.0;

    return [

        {
            type: 'units',
            label: 'Distance Units',
            input: inputOptions.units.input,
            setInput: inputOptions.units.setInput,
            options: getOptions('units', customRadius),
        },
	];
}

function getOptions(type, customRadius) {

        return [
            { label: 'Miles', value: JSON.stringify({unitType: 'Miles', earthRadius: 3959.0})},
            { label: 'Kilometers', value: JSON.stringify({unitType: 'Kilometers', earthRadius:  6371.0})},
            { label: 'Nautical Miles', value: JSON.stringify({unitType: 'Nautical Miles',  earthRadius: 3440.0})},
            { label: 'Custom', value: JSON.stringify({unitType: 'Custom Units', earthRadius: customRadius })},
        ]
    }


function verifyRadius(radiusString) {
    const radiusRegex = /^\d+(\.\d+)?$/;
    return radiusString.match(radiusRegex) ? true : false;
}

function resetClientModal(inputOptions, currentSettings, close) {
    inputOptions.units.setInput(JSON.stringify(currentSettings.distanceUnits));

    close();
}
