using Api.Dtos;
using Api.Models;
using Api.Repositories;
using Api.Repositories.Repositories;
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
        private ApplicationContext _context;
        private CriminalCodeRepository criminalCodeRepository;
        public CriminalCodeService(ApplicationContext context)
        {
            _context = context;
            criminalCodeRepository = new CriminalCodeRepository(_context);
        }

        public async Task<FilterDto<CriminalCodeAllDto>> GetAllCriminalCode(string filter = null, int page = 0)
        {
            var skip = page * 10;
            var criminalCode = criminalCodeRepository.GetAllCriminalCode(filter);

            return new FilterDto<CriminalCodeAllDto>()
            {
                Count = criminalCode.Count(),
                Data = await criminalCode.OrderByDescending(x => x.CreateDate)
                    .Select(x => new CriminalCodeAllDto { 
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
                    .ToListAsync()
            };
        }

        public async Task<CriminalCodeAllDto> GetCriminalCode(int id)
        {
            var criminalCode = await criminalCodeRepository.GetCriminalCodeById(id).FirstOrDefaultAsync();
            if (criminalCode == null) throw new Exception("Id não encontrado!");

            return new CriminalCodeAllDto
            {
                Name = criminalCode.Name,
                Description = criminalCode.Description,
                Penality = criminalCode.Penality,
                PrisonTime = criminalCode.PrisonTime,
                Date = criminalCode.CreateDate,
                Status = criminalCode.Status.Name,
                StatusId = criminalCode.Status.Id
            };
        }

        public async Task UpdateCriminalCode(int userId, int id, CriminalCodeAllDto criminalCodeDto)
        {
            try
            {
                var criminalCode = await criminalCodeRepository.GetCriminalCodeById(id).FirstOrDefaultAsync();
                if (criminalCode != null)
                {
                    criminalCode.Name = criminalCodeDto.Name;
                    criminalCode.Description = criminalCodeDto.Description;
                    criminalCode.Penality = criminalCodeDto.Penality;
                    criminalCode.PrisonTime = criminalCodeDto.PrisonTime;
                    criminalCode.StatusId = criminalCodeDto.StatusId;
                    criminalCode.UpdateDate = DateTime.Now;
                    criminalCode.UpdateUserId = userId;

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            };
        }

        public async Task CreateCriminalCode(int userId, CriminalCodeAllDto criminalCodeDto)
        {
            try
            {
                var criminalCode = await criminalCodeRepository.GetByName(criminalCodeDto.Name).FirstOrDefaultAsync();
                if (criminalCode != null) throw new Exception("Nome já existente!");

                var newCriminalCode = new CriminalCode
                {
                    CreateUserId = userId,
                    Name = criminalCodeDto.Name,
                    Description = criminalCodeDto.Description,
                    Penality = criminalCodeDto.Penality,
                    StatusId = criminalCodeDto.StatusId,
                    PrisonTime = criminalCodeDto.PrisonTime,
                    CreateDate = DateTime.Now,
                };

                criminalCodeRepository.Add(newCriminalCode);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task DeleteCriminalCode(int id)
        {
            try
            {
                var criminalCode = criminalCodeRepository.GetById(id);
                if (criminalCode != null)
                {
                    criminalCodeRepository.Delete(criminalCode);
                    await _context.SaveChangesAsync();
                }
            } 
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
