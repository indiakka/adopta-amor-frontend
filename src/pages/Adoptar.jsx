import { useEffect } from "react";
import { useState } from "react"
import AnimalCard from "../components/card/AnimalCard";
import axios from "axios";
import Filter from "../components/filter/Filter";


const Adoptar = () => {
  const [animales, setAnimales] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({})
  useEffect(() => {
    const data = async () => {
      const response = await axios.get("http://localhost:3000/results"
      );
      const info = await response.data;
      setAnimales(info);
      console.log(info)
    }

    data()
  }, [])

  const handleFilterChange = (category, value) => {
    setFilterCriteria((prevFilterCriteria) => {
      const updatedFilterCriteria = {
        [category]: value,
      }
      //filter delete or basically checking if it null or empty string then myFilteredAnimals will be all animals
      if (value === null || value === "") {
        Object.keys(prevFilterCriteria).forEach((key) => {
          updatedFilterCriteria[key] = null
        })
      } else {
        //reset filters when new filter is clicked 
        Object.keys(prevFilterCriteria).forEach((key) => {
          if (key !== category) {
            updatedFilterCriteria[key] = null
          }
        })
      }
      return updatedFilterCriteria
    })
  }

  const filteredAnimales = animales.filter((animal) => {
    if (filterCriteria.tipo && animal.tipo !== filterCriteria.tipo) {
      return false
    }
    if (filterCriteria.tamano && animal.tamaño !== filterCriteria.tamano) {
      return false
    }
    // Edad filter logic
    if (filterCriteria.edad) {
      const edad = animal.años

      switch (filterCriteria.edad) {
        case "Cachorrito":
          return edad >= 0 && edad <= 1
        case "Adulto":
          return edad > 1 && edad < 5
        default:
          return true
      }
    }
    return true
  })

  return (
    <>
      <Filter onClick={handleFilterChange} />
      {filteredAnimales.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </>
  )
}

export default Adoptar