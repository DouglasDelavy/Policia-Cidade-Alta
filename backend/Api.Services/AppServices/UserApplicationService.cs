using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static BCrypt.Net.BCrypt;

namespace Api.Services.AppServices
{
    public class UserApplicationService : GenericApplicationService
    {
        public UserApplicationService(UnitOfWork uow) : base(uow)
        {
        }

        public async Task<User> CreateUser(UserDto userDto)
        {
            var user = await _uow.UserRepository.GetByUserName(userDto.UserName).FirstOrDefaultAsync();
            if (user != null)
            {
                throw new Exception("Usuário já existente!");
            }

            var newUser = new User
            {
                UserName = userDto.UserName,
                Password = HashPassword(userDto.Password)
            };

            _uow.UserRepository.Add(newUser);
            await _uow.Commit();

            return newUser;
        }

        public async Task<User> CheckUser(UserDto userDto)
        {
            var user = await _uow.UserRepository.GetByUserName(userDto.UserName).FirstOrDefaultAsync();
            if (user == null) throw new Exception("Usuário não encotrado!");

            var isValidPassword = Verify(userDto.Password, user.Password);
            if (!isValidPassword) throw new Exception("Senha inválida!");

            return user;
        }
    }
}
