import api from './apiConfig';

export const getAllTopics = async () => {
  const resp = await api.get(`/topics`);
  return resp.data;
}

export const getQuestions = async (myOwn, topic) => {
  let queries = '' 
  if (myOwn) queries += 'my_own=true'
  if (topic) {
    if (myOwn) queries += '&' 
    queries += 'topic='+topic 
  }

  const resp = await api.get(`/questions${queries ? '?' + queries : ''}`);
  return resp.data;
}

export const getOneQuestion = async (id) => {
  const resp = await api.get(`/questions/${id}`);
  return resp.data;
}

export const createQuestion = async (questionData) => {
  const resp = await api.post(`/questions`, { question: questionData });
  return resp.data;
}

export const editQuestion = async (id, questionData) => {
  const resp = await api.put(`/questions/${id}`, { question: questionData });
  return resp.data;
}

export const deleteQuestion = async (id) => {
  const resp = await api.delete(`/questions/${id}`);
  return resp.data;
}