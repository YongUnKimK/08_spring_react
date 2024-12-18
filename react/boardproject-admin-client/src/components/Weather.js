(async function () {
  // 발급받은 API 키를 여기에 입력하세요
  const API_KEY = "BadW0y81g26anWKY%2FNy8EROQlsMwr0mngRky5E848f0opciifeUcrrXJTdK2rlrfY%2FVnB0HW0mV2nPT5GjYHCQ%3D%3D";
  
  // 조회할 좌표값 (서울 종로구의 격자 좌표: NX=60, NY=127)
  const NX = 60; 
  const NY = 127;

  // 기상청 API URL 및 데이터 가져오는 함수
  const getWeatherData = async (apiKey, nx, ny) => {
    const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    const now = new Date();

    // 기상청 기준: 1시간 전 데이터를 기준으로 요청
    const baseDate = now.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
    const baseTime = `${String(now.getHours() - 1).padStart(2, '0')}00`; // HH00

    // 요청 URL 생성
    const url = new URL(baseUrl);
    url.searchParams.append("serviceKey", apiKey);
    url.searchParams.append("pageNo", "1");
    url.searchParams.append("numOfRows", "100");
    url.searchParams.append("dataType", "JSON");
    url.searchParams.append("base_date", baseDate);
    url.searchParams.append("base_time", baseTime);
    url.searchParams.append("nx", nx);
    url.searchParams.append("ny", ny);

    try {
      // API 요청
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      // TMP(기온) 데이터 추출
      const items = data.response.body.items.item;
      const temperature = items.find((item) => item.category === "TMP");
      if (temperature) {
        return `${temperature.fcstValue}°C`;
      } else {
        return "기온 데이터를 찾을 수 없습니다.";
      }
    } catch (error) {
      return `API 요청 실패: ${error.message}`;
    }
  };

  // 현재 기온 출력
  const currentTemperature = await getWeatherData(API_KEY, NX, NY);
  console.log(`현재 기온: ${currentTemperature}`);
})();