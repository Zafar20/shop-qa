import  {FC, useEffect, useState} from 'react'
import Select, { components, SingleValue } from 'react-select';
import filterStore from '../../store/filterStore';

interface IOptions {
  value: string;
  label: string;
}

const options: IOptions[] = [
  { value: '', label: 'товары' },
  { value: 'price', label: 'Цене' },
  { value: 'rating', label: 'Рейтингу' },
  { value: 'title', label: 'Названию' }
];

const Sort:FC = () => {

 

  const [selectedOption, setSelectedOption] = useState<SingleValue<IOptions>>(null);
  const {setSortValue, setCurrentPage} = filterStore(state => state)

  const handleSelectChange = (selectedOption:any) => {
  
    
    setSelectedOption(selectedOption)
    setSortValue(selectedOption.value)
    setCurrentPage(1)
  };
  
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '200px',
      height: '50px',
      border: '1px solid #efefef',
      borderRadius: '10px',
      background: 'rgb(252, 252, 253)',
      color: 'red',
      fontSize: '14px',
      fontWeight: '400',
      boxShadow: 'none',
      padding: '0px 12px'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'var(--font-family)',
      fontWeight: '400',
      fontSize: '14px',
      textAlign: 'justify',
      color: '#9aa0b4',
    }),
    indicatorsContainer: () => ({
      display: 'none' // ❌ скрывает стрелку вниз и разделительную палочку
    }),
  };
  
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
          
    const sortValue = searchParams.get('sort') || '';
    if (sortValue) {
      const selected = options.find(option => option.value === sortValue) || null;
      setSelectedOption(selected);
    }
    
  }, [location.search]);

  return (
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder="Сортировать по:"
        styles={customStyles}
      />
  )
}

export default Sort