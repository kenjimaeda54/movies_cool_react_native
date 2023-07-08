import { server } from './server/server'

//preciso declarar esse arquivo no packgajson
//setupFilesAfterEnv
//setupFilesAfterEnv vai rodar depois que nosso ambiente subir
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
