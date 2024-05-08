import React, { useState, useEffect } from 'react';
import './Baro_listing.css';
import BaroList from '../../assets/baro_listing.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const BaroListing = () => {
    const [baroList, setBaroList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [avoidTerm, setAvoidTerm] = useState('');
    const [searchRecommendation, setSearchRecommendation] = useState('');

    useEffect(() => {
        setBaroList(BaroList);
    }, []);

    const downloadJson = () => {
        const jsonContent = JSON.stringify(baroList, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'baro_listing_modified.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSort = (key) => {
        const newSortOrder = key === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedList = [...baroList].sort((a, b) => {
            if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setBaroList(sortedList);
        setSortBy(key);
        setSortOrder(newSortOrder);
    };

    const handleSearchFilter = (searchValue, avoidValue, recommendationValue) => {
        const filteredList = BaroList.filter(item => {
            const searchMatch = (
                item.Item.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Type.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Cost.toLowerCase().includes(searchValue.toLowerCase())
            );
    
            const recommendationMatch = (
                item.Recommendation.toLowerCase().includes(recommendationValue.toLowerCase())
            );

            const avoidMatch = avoidValue !== '' && (
                !item.Item.toLowerCase().includes(avoidValue.toLowerCase()) &&
                !item.Type.toLowerCase().includes(avoidValue.toLowerCase()) &&
                !item.Cost.toLowerCase().includes(avoidValue.toLowerCase())
            );
    
            return searchMatch && recommendationMatch && (avoidMatch || avoidValue === '');
        });
    
        setBaroList(filteredList);
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        handleSearchFilter(e.target.value, avoidTerm, searchRecommendation);
    };
    
    const handleAvoid = (e) => {
        setAvoidTerm(e.target.value);
        handleSearchFilter(searchTerm, e.target.value, searchRecommendation);
    };
    
    const handleRecommendation = (e) => {
        setSearchRecommendation(e.target.value);
        handleSearchFilter(searchTerm, avoidTerm, e.target.value);
    };

    /*Since I did not plan properly, I had to change the classname of button to match with recommendation. 
    Since I have long recommendation, I am gonna send it here, then this function will return the correct class name.*/
    const getButtonClass = (recommendation) => {
        if (recommendation === 'Must Have') {
            return 'btn btn-success';
        } else if (recommendation === 'Good To Have') {
            return 'btn btn-primary';
        } else if (recommendation === 'If You Want') {
            return 'btn btn-secondary';
        } else if (recommendation === 'Farmable') {
            return 'btn btn-warning';
        }else {
            return 'btn btn-danger';
        }
    }


    return (
        <div className=''>

            <div className='small_screen_warning'>
                <h3>Small Screen/Mobile Detected</h3>
                <p>Since I suck at front end, sorry for horrible looking table :(</p>

            </div>
            <div className='row'>
            <div className='col-lg-3 col-md-6 col-12'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className='mb-3 form-control'
                    />
                </div>
                <div className='col-lg-3 col-md-6 col-12'>
                    <input type='text'
                        placeholder='Avoid...'
                        value={avoidTerm}
                        onChange={handleAvoid}
                        className='mb-3 form-control'
                    />
                </div>

                <div className='col-lg-3 col-md-6 col-12'>
                    <select
                        value={searchRecommendation}
                        onChange={handleRecommendation}
                        className='mb-3 form-control'
                    >
                        <option value="">Select Recommendation</option>
                        <option value="Must Have">Must Have</option>
                        <option value="Good To Have">Good To Have</option>
                        <option value="If You Want">If You Want</option>
                        <option value="Farmable">Farmable</option>
                        <option value="No">No</option>
                    </select>
                </div>

                

                
            </div>
            
            <div className='responsive_table'>
                <table className="table table-striped table-dark table-bordered table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => handleSort('Item')} className='sort'>
                                Name{' '}
                                {sortBy === 'Item' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Item' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col" onClick={() => handleSort('Type')} className='sort'>
                                Type{' '}
                                {sortBy === 'Type' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Type' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col" onClick={() => handleSort('Cost')} className='sort'>
                                Cost{' '}
                                {sortBy === 'Cost' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Cost' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col">Recommendation</th>
                            <th scope='col'>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baroList.map((baro, index) => (
                            <tr key={baro.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{baro.Item}</td>
                                <td>{baro.Type}</td>
                                <td>{baro.Cost}</td>
                                <td>
                                    <button type="button" className={getButtonClass(baro.Recommendation)} disabled>{baro.Recommendation}</button>
                                </td>
                                <td>{baro.Description}  </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            

            <p className='text-danger mt-2'>Make sure your filters are off before downloading.</p>
            <button type="button" className="btn btn-primary" onClick={downloadJson}>
                Download the data in JSON
            </button>
        </div>
    );
};

export default BaroListing;
