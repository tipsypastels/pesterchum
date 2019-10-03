Rails.application.routes.draw do
  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      sign_up: 'register',
    }

  post '/messages', to: 'messages#create'

  get '/conversations/:id', to: 'conversations#show'

  patch '/users/change', to: 'users#change'

  root to: 'users#index'
end
