Rails.application.routes.draw do
  resources :completeds
  resources :comments
  resources :questions

  # authentication_controller holds login and verify 
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  
  resources :users

  # we only need to get all topics really, not any other route 
  get '/topics', to: 'topics#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
