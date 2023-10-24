import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Collapse,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    ModalFooter,
    Row,
} from 'reactstrap';
import Select from 'react-select';
import { BsChevronDown } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useToggle } from '../../hooks/useToggle';

import verifyCoordinates from '../../utils/verifyCoordinates';
 
export default function AddPlace(props) {
    const [foundPlaces, setFoundPlaces] = useState([]);
    const [coordString, setCoordString] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleAddPlace}>
            <AddPlaceHeader toggleAddPlace={props.toggleAddPlace} />
            <PlaceSearch
                refreshDistances={props.refreshDistances}
                append={props.append}
                foundPlaces={foundPlaces} setFoundPlaces={setFoundPlaces}
                coordString={coordString} setCoordString={setCoordString}
                selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
                selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}
                serverSettings={props.serverSettings}
            />
            <AddPlaceFooter
                foundPlaces={foundPlaces}
                setCoordString={setCoordString}
                selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
                selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}
            />
        </Modal>
    );
}
 
function AddPlaceHeader(props) {
    return (
        <ModalHeader className='ml-2' toggle={props.toggleAddPlace}>
            Add a Place
        </ModalHeader>
    );
}
 
function PlaceSearch(props) {
    const context = { coordString: props.coordString, 
        foundPlaces: props.foundPlaces, setFoundPlaces: props.setFoundPlaces,
        selectedType: props.selectedTypes, selectedCountries: props.selectedCountries,
    }

    useEffect(() => { verifyCoordinates(context); }, [props.coordString]);
 
    return (
        <ModalBody>
            <Input
                onChange={(input) => props.setCoordString(input.target.value)}
                placeholder='Enter Search or Place Coordinates'
                data-testid='coord-input'
                value={props.coordString}
            />
            <FilterSection {...props} />
            <PlacesInfo foundPlaces={props.foundPlaces} append={props.append} refreshDistances={props.refreshDistances}/>
        </ModalBody>
    );
}

function FilterSection(props) {
    const [hasType, toggleType] = useToggle(props.serverSettings.serverConfig.features.includes(/type/i));
    const [hasWhere, toggleWhere] = useToggle(props.serverSettings.serverConfig.features.includes(/where/i));
    const [showFilterOptions, toggleFilterOptions] = useToggle(false);
    
    useEffect(() => {
        toggleType(props.serverSettings.serverConfig.features.includes(/type/i));
        toggleWhere(props.serverSettings.serverConfig.features.includes(/where/i));
    }, [props.serverSettings])

    return (
        <Collapse isOpen={hasType || hasWhere}>
            <FilterArrow toggleFilterOptions={toggleFilterOptions}/>
            <FilterOptions 
                serverConfig={props.serverSettings.serverConfig}
                showFilterOptions={showFilterOptions}
                hasType={hasType} hasWhere={hasWhere}
                selectedTypes={props.selectedTypes} setSelectedTypes={props.setSelectedTypes}
                selectedCountries={props.selectedCountries} setSelectedCountries={props.setSelectedCountries}
            />
        </Collapse>
    );
}

function FilterArrow(props) {
	return (
		<Row>
            <Col>
                {`Filter Options`}
            </Col>
            <Col>
			    <BsChevronDown data-testid='filter-toggle' style={{display: 'flex', marginLeft: 'auto', marginTop: '2%'}} onClick={props.toggleFilterOptions}/>
            </Col>
		</Row>
	);
}

function FilterOptions(props) {
    return (
        <Collapse isOpen={props.showFilterOptions}>
            <br />
            <SelectRow
                isOpen={props.hasType}
                selectedOptions={props.selectedTypes}
                setSelectedOptions={props.setSelectedTypes}
                optionList={props.serverConfig.type}
                placeholderText='Select one or more location types'
            />
            <br />
            <SelectRow
                isOpen={props.hasWhere}
                selectedOptions={props.selectedCountries}
                setSelectedOptions={props.setSelectedCountries}
                optionList={props.serverConfig.where}
                placeholderText='Select one or more countries'
            />
        </Collapse>
    );
}

function SelectRow(props) {
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        setDropdownOptions(loadDropdownOptions(props.optionList));
    }, []);

    const handleChange = (e) => {
        props.setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    return (
        <Collapse isOpen={props.isOpen}>
            <Select
                placeholder={props.placeholderText}
                value={dropdownOptions.filter(obj => props.selectedOptions.includes(obj.value))}
                options={dropdownOptions}
                onChange={handleChange}
                isMulti
                isClearable
                closeMenuOnSelect={false}
            />
        </Collapse>
    );
}
 
function PlacesInfo(props) {
    if(!props.foundPlaces || props.foundPlaces?.length < 1){
        return(<></>);
    }
 
    let foundPlacesList = []
    props.foundPlaces.forEach((place, index) =>{
        foundPlacesList.push(
            <div key={index}>
                <h6 id={`found-place-${index}`}>{place.formatPlace()}</h6>
                <Button
                    color='primary'
                    onClick={() => {
                        props.append(props.foundPlaces[index]);
                        props.refreshDistances();
                    }}
                    data-testid={`add-place-button-${index}`}
                    disabled={!props.foundPlaces}
                >
                    {<FaPlus />}
                </Button>
            </div>
        )
    })
    return(
        <>
            <div>
                {foundPlacesList}
            </div>
        </>
    );
}
 
function AddPlaceFooter(props) {
    return (
        <ModalFooter>
            <Button
                color='primary'
                onClick={() => {
                    props.setCoordString('#random#');
                }}
                data-testid='random-button'
            >
                Random
            </Button>
 
            <Button
                color='secondary'
                onClick={() => {
                    props.setSelectedTypes([]);
                    props.setSelectedCountries([]);
                    props.setCoordString('');
                }}
                data-testid='clear-query-button'
                disabled={!props.foundPlaces && props.selectedTypes.length == 0}
            >
                Clear Query
            </Button>
        </ModalFooter>
    );
 
}

function loadDropdownOptions(optionList) {
    let selectOptions= [];
    optionList?.forEach((option) => {
        selectOptions.push({value: option, label: option})
    });
    return selectOptions;
}
