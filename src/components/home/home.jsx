import "./home.css";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  const key = "4daf4fdd5ded8db79596d52ff880648e";
  const [data, setData] = useState("");
  const [datas, setDatas] = useState([]);

  let today = new Date();
  var newDay = String(new Date().getDate()).padStart(2, "0");
  var newMoon = String(today.getMonth() + 1).padStart(2, "0");
  var newYear = today.getFullYear();

  const fetchData = (evt) => {
    evt.preventDefault();
    const { input } = evt.target.elements;
    setData(input.value);
    input.value = "";
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&APPID=${key}`
      )
      .then((res) => {
        setDatas(res?.data);
      })
      .catch((error) => console.log(error));
  }, [data, key]);
  let img = "☁️";
  console.log(
    datas?.weather?.filter((e) => {
      console.log(e);
      if (e?.main == "Clouds") {
        img = "☁️";
      } else if (e?.main == "Clear") {
        img = "☀️";
      } else if (e?.main == "Rain" || e?.main == "Light rain") {
        img = "🌧️";
      } else if (e?.main == "Sunny") {
        img = "🌞";
      } else if (e?.main == "Smoke" || e?.main == "Mist" || e?.main == "Fog") {
        img = "💨";
      } else if (e?.main == "Snow" || e?.main == "Light snow") {
        img = "❄️";
      }
    })
  );

  let temp_min = datas?.main?.temp_min || 0;
  let temp_max = datas?.main?.temp_max || 0;

  let ur = ((temp_max + temp_min) / 2).toFixed(2);
  return (
    <>
      <div>
        <Container>
          <Form onSubmit={fetchData}>
            <label>
              <Search_input
                type="text"
                name="input"
                // className="search-box"
                placeholder="Search..."
              />
            </label>
            <Btn type="submit">Send</Btn>
          </Form>

          <Header_box>
            <div>
              <Location_city>{datas.name}</Location_city>
              <Location_date>
                {newDay}.{newMoon}.{newYear}
              </Location_date>
            </div>
            <div>
              <Img>{img}</Img>
            </div>
            <div className="main-temp">
              <div className="temp">
                {ur}
                <span>°C</span>
              </div>
              <div className="weather">Fog</div>
              <div className="hi-low">
                {temp_min}°C / {temp_max}°C
              </div>
            </div>
          </Header_box>
        </Container>
      </div>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 5px;
  padding-left: 5px;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 15px 15px;
`;

const Btn = styled.button`
  width: 40%;
  margin-left: 10px;
  max-width: 80px;
  padding: 10px 15px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 16px 0px 16px 0;
  border-bottom: 3px solid "#df8y00";
  color: #333;
  font-size: 20px;
  font-weight: 300;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Search_input = styled.input`
  width: 100%;
  max-width: 280px;
  padding: 10px 15px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 16px 0px 16px 0;
  border-bottom: 3px solid "#df8y00";
  color: #333;
  font-size: 20px;
  font-weight: 300;
  transition: 0.2s ease-in-out;
  &:focus {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0 16px 0 16px;
  }
`;
const Img = styled.p`
  font-size: 5rem;
`;

const Header_box = styled.div`
  margin-top: 10px;
  padding: 25px 25px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Location_city = styled.p`
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const Location_date = styled.p`
  color: #fff;
  font-size: 16px;
`;

const Main_temp = styled.div`
  color: #ffffff;
  font-size: 100px;
  font-weight: 900;
  margin: 30px 0;
  text-shadow: 2px 10px rgba(0, 0, 0, 0.6);
`;
export { Home };
