using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Api.Repositories.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static BCrypt.Net.BCrypt;

namespace Api.Services.AppServices
{
    public class UserService
    {
        private ApplicationContext _context;
        private UserRepository userRepository;
        public UserService(ApplicationContext context)
        {
            _context = context;
            userRepository = new UserRepository(_context);
        }

        public async Task<User> CreateUser(UserDto userDto)
        {
            var user = await userRepository.GetByUserName(userDto.UserName).FirstOrDefaultAsync();
            if (user != null)
            {
                throw new Exception("Usuário já existente!");
            }

            var newUser = new User
            {
                UserName = userDto.UserName,
                Password = HashPassword(userDto.Password)
            };

            userRepository.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> CheckUser(UserDto userDto)
        {
            var user = await userRepository.GetByUserName(userDto.UserName).FirstOrDefaultAsync();
            if (user == null) throw new Exception("Usuário não encotrado!");

            var isValidPassword = Verify(userDto.Password, user.Password);
            if (!isValidPassword) throw new Exception("Senha inválida!");

            return user;
        }
    }
}
