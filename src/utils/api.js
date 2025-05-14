//로그인된 사용자의 토큰을 로컬스토리지에서 가져오기
const getToken = () => {
  return localStorage.getItem("userToken");
};

//인증이 필요한 GET/DELETE 요청
export const fetchWithToken = async(url, options = {}) => {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || "사용자 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
}

//인증이 필요한 POST/PUT 요청
export const postWithToken = async (url, body, extraOptions = {}) => {
  return fetchWithToken(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...extraOptions,
  });
};

//인증이 필요 없는 POST 요청(로그인, 회원가입)
export const postWithoutToken = async (url, data, extraOptions = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(extraOptions.headers || {}),
    },
    body: JSON.stringify(data),
    ...extraOptions,
  });

  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입에 실패했습니다.");
  }
  return response.json();
};
