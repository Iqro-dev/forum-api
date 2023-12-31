import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            getUserByUsername: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const result = createMock<User[]>();

      jest.spyOn(usersService, 'getUsers').mockResolvedValue(result);

      expect(await usersController.getUsers()).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should return user with given id', async () => {
      const result = createMock<User>();

      const id = '2';

      const getUserByIdSpy = jest
        .spyOn(usersService, 'getUserById')
        .mockResolvedValue(result);

      expect(await usersController.getUserById(id)).toBe(result);

      expect(getUserByIdSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('getUserByUsername', () => {
    it('should return user with given username', async () => {
      const username = 'John';

      const result = createMock<User>({ username: username });

      const getUserByUsernameSpy = jest
        .spyOn(usersService, 'getUserByUsername')
        .mockResolvedValue(result);

      expect(await usersController.getUserByUsername(username)).toBe(result);

      expect(getUserByUsernameSpy).toHaveBeenCalledWith(username);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const result = createMock<User>();

      const createUserMock = createMock<CreateUserDto>();

      const createUserSpy = jest
        .spyOn(usersService, 'createUser')
        .mockResolvedValue(result);

      expect(await usersController.createUser(createUserMock)).toBe(result);

      expect(createUserSpy).toHaveBeenCalledWith(createUserMock);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const result = createMock<User>();

      const updateUserMock = createMock<CreateUserDto>();

      const id = '3';

      const updateUserSpy = jest
        .spyOn(usersService, 'updateUser')
        .mockResolvedValue(result);

      expect(await usersController.updateUser(id, updateUserMock)).toBe(result);

      expect(updateUserSpy).toHaveBeenCalledWith(id, updateUserMock);
    });
  });

  describe('deleteUser', () => {
    it('should delete user with given id', async () => {
      const result = createMock<User>();

      const id = '3';

      const deleteUserSpy = jest
        .spyOn(usersService, 'deleteUser')
        .mockResolvedValue(result);

      expect(await usersController.deleteUser(id)).toBe(result);

      expect(deleteUserSpy).toHaveBeenCalledWith(id);
    });
  });
});
