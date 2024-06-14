import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AverageCalculator() {
    const [numbers, setNumbers] = useState([]);
    const [numType, setNumType] = useState('p'); 
    const [error, setError] = useState(null);
    const [Average, setAverage] = useState(0);
    
    useEffect(() => {
        fetchNumbers();
    }, [numType]);

    const cal_avg = (numbers) => {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        setAverage(sum / numbers.length);
        console.log(Average);
    }

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MzUxMjEyLCJpYXQiOjE3MTgzNTA5MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjE1NmYzYjI3LTAyNmQtNGRiYS04MTBiLTgzZjY0MjAzZDk5YyIsInN1YiI6IjcyNzgyMXR1YWQwMDhAc2tjdC5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjE1NmYzYjI3LTAyNmQtNGRiYS04MTBiLTgzZjY0MjAzZDk5YyIsImNsaWVudFNlY3JldCI6Ik90Z0xvd2FlYnZza1ladEQiLCJvd25lck5hbWUiOiJBc3dhbnRoIFYgUiIsIm93bmVyRW1haWwiOiI3Mjc4MjF0dWFkMDA4QHNrY3QuZWR1LmluIiwicm9sbE5vIjoiNzIyNzgyMVRVQUQwMDgifQ.Hp4WNXRGA27DmZGKDOvUBfBnTDVzdNYWKWl4AAyNQ3s'
    const fetchNumbers = async () => {
        try {
            const res = await axios.get(`http://20.244.56.144/test/${numType}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = res.data;
            setNumbers(data);
            cal_avg(data); 
            console.log(data);
        } catch (err) {
            console.error(err);
            setError('Error fetching numbers');
        }
    };

    return (
        <div>
            <header>
                <h1 className="text-3xl font-bold text-teal-600">
                    Average Calculator
                </h1>
            </header>

            <section className='flex flex-col justify-center items-center h-screen w-screen space-y-10'>
                <div>
                    <label>
                        Select Number Type
                        <select onChange={(e) => setNumType(e.target.value)}>
                            <option value="p">Prime</option>
                            <option value="e">Even</option>
                            <option value="f">Fibonacci</option>
                            <option value="r">Random</option>
                        </select>
                    </label>
                </div>

                <div>
                    <button onClick={fetchNumbers} className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                        Fetch Numbers
                    </button>
                </div>

                {error && <p className='text-red-500'>{error}</p>}

                {numbers.length > 0 && (
                    <div>
                        <p><strong>Numbers:</strong> {numbers.join(', ')}</p> 
                        <p><strong>Average:</strong> {Average}</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default AverageCalculator;
