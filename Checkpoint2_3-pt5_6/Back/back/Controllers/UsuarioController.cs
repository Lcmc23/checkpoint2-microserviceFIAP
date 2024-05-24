using back.Entidades;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Data;


namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly String? _connectionString;

        public UsuarioController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private IDbConnection OpenConnection()
        {
            IDbConnection dbConnection = new SqliteConnection(_connectionString);
            dbConnection.Open();
            return dbConnection;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            using IDbConnection dbConnection = OpenConnection();
            string sql = "select id, nome, senha from Usuario;";
            var result = await dbConnection.QueryAsync<Usuario>(sql);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUsuarioById(int id)
        {
            using IDbConnection dbConnection = OpenConnection();
            string sql = "select id, nome, senha from Usuario where id = @id;";
            var result = await dbConnection.QueryFirstOrDefaultAsync<Usuario>(sql, new { id });

            dbConnection.Close();

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> AddUsuario([FromBody] Usuario usuario)
        {
            // Validações para garantir que os dados do usuário sejam válidos antes de salvar no banco de dados
            if (string.IsNullOrEmpty(usuario.Nome) || string.IsNullOrEmpty(usuario.Senha))
            {
                return BadRequest("Nome e senha são obrigatórios.");
            }

            using IDbConnection dbConnection = OpenConnection();
            string query = @"INSERT into Usuario (nome, senha)
                           VALUES (@Nome, @Senha);";

            await dbConnection.ExecuteAsync(query, usuario);

            dbConnection.Close();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUsuario([FromBody] Usuario usuario)
        {
           // Validações para garantir que os dados do usuário sejam válidos antes de salvar no banco de dados
            if (string.IsNullOrEmpty(usuario.Nome) || string.IsNullOrEmpty(usuario.Senha))
            {
                return BadRequest("Nome e senha são obrigatórios.");
            }

            using IDbConnection dbConnection = OpenConnection();
            string query = @"UPDATE Usuario SET nome = @Nome, senha = @Senha WHERE id = @Id;";

            await dbConnection.ExecuteAsync(query, usuario);

            dbConnection.Close();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUsuario(int id)
        {
            using IDbConnection dbConnection = OpenConnection();
            string query = @"DELETE FROM Usuario WHERE id = @Id;";

            await dbConnection.ExecuteAsync(query, new { Id = id });

            dbConnection.Close();

            return Ok();
        }
    }
}
