using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.AppServices
{
    public class CriminalCodeService
    {
        private UnitOfWork _uow;
        public CriminalCodeService(UnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }

        public async Task<FilterDto<CriminalCodeDto>> GetCriminalCode(string filter = null, int page = 0)
        {
            var skip = page * 10;
            var criminalCode = _uow.CriminalCodeRepository.GetAllCriminalCode(filter);

            return new FilterDto<CriminalCodeDto>()
            {
                Count = criminalCode.Count(),
                Data = criminalCode.OrderByDescending(x => x.CreateDate)
                    .Select(x => new CriminalCodeDto { 
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Date = x.CreateDate,
                        Penality = x.Penality,
                        PrisonTime = x.PrisonTime,
                        Status = x.Status.Name
                    })
                    .Skip(skip)
                    .Take(10)
                    .ToList()
            };
        }

        public async Task CreateCriminalCode(int userId, CriminalCodeDto criminalCodeDto)
        {
            var criminalCode = await _uow.CriminalCodeRepository.GetByName(criminalCodeDto.Name).FirstOrDefaultAsync();
            if (criminalCode != null) throw new Exception("Nome já existente!");

            var newCriminalCode = new CriminalCode
            {
                CreateUserId = userId,
                Name = criminalCodeDto.Name,
                Description = criminalCodeDto.Description,
                Penality = criminalCodeDto.Penality,
                StatusId = 1,
                PrisonTime = criminalCodeDto.PrisonTime,
                CreateDate = DateTime.Now,
            };

            _uow.CriminalCodeRepository.Add(newCriminalCode);
            await _uow.Commit();
        }

        public async Task DeleteCriminalCode(int id)
        {
            var criminalCode = _uow.CriminalCodeRepository.GetById(id);
            if (criminalCode != null)
            {
                _uow.CriminalCodeRepository.Delete(criminalCode);
                await _uow.Commit();
            }
        }
    }
}
