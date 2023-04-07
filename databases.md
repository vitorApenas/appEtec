## -- TODOS OS DADOS IMPORTANTES SÃO CRIPTOGRAFADOS --

<hr>

## Cadastro
Vai pegar o rm/email constituicional do aluno e pesquisar no banco de dados do NSA (fake), se estiver lá vai mandar um email de confirmação e vai para o database de não confirmados.
Quando o usuário tiver colocado o código, ele vai tentar entrar, se estiver certo, os dados dele vão ser copiados do banco NSA e vão para o banco de usuários.

## Tabela NSA
    RM (PK), Email Instituicional, Turma (completo), Nome (completo), RG

## Tabela NÃO CONFIRMADOS
    Id (PK), Email Institucional, RM, Foto de Perfil (se não for feito o input, será uma default), Senha, Código de confirmação

## Tabela ALUNOS
    Id (PK), Email Institucional, RM, Nome (completo), RG, Turma (sigla), Curso (completo), Foto de Perfil, Senha

## Tabela FUNCIONARIOS
    Id (PK), Email Institucional, Nome (completo), Foto de Perfil, Senha

--Tem que ter imagens para os usuarios (decidir onde colocar o input)
Tem que ter uma tela pra input
<hr>

## Login
O usuario vai fazer input das credenciais dele, se o rm ou email baterem com a senha (que vai estar criptografada) ele vai poder entrar

<hr>

## Horários
## Aulas por dia
    segunda-feira -> 0-8
    terça-feira -> 9-17
    quarta-feira -> 18-26
    quinta-feira -> 27-35
    sexta-feira -> 36-44

Independente da estrutura usada, vai ser necessária uma tabela para os professores

* 1º Hipótese
<p>Uma tabela só com todas as aulas, seria informada qual é a aula em relação ao horário e ao dia da semana (0 a 44) (9 aulas por 5 dias), qual é o professor, qual é a sala e qual a matéria, além de falar de qual turma é a aula, assim, todos os horários dessa turma serão enviados para o front, onde serão ordenados.</p>

## Tabela HORÁRIOS
    Id (PK), turma, professor, sala, matéria, horário

* 2ª Hipótese
<p>Vai ter mais que uma tabela responsável pelos horários, seriam várias tabelas mais descritivas e relacionadas entre si</p>

## Tabela TURMAS
    Id (PK), Turma, Ano e curso

## Tabela MATÉRIAS
    Id (PK), Sigla, Nome, Descrição

## Tabela PROFESSORES
    Id (PK), Sigla, Nome, Sala, Presença

## Tabela HORÁRIOS
Esse também vai ter que ser organizado em números das aulas (0 a 44)

    Id (PK), Horário, IdTurma, IdMatéria, IdProfessor

Terão que ser feitas requests nesses 4 bancos de dados cada vez que o horário for carregado (precisa ficar no armazenamento local), os outros databases terão um relacionamento 1:n com esse.

<hr>

## Presença dos professores
A presença de um professor vai ser negada por um funcionário ou membro do grêmio estudantil (default: o professor veio), a tabela de professores seria igual à que foi mostrada acima.

<hr>

## Grêmio

A lista de alunos do grêmio é atualizada por um funcionário da escola, os alunos que estão no grêmio vão ter privilégios como fazer postagens.

Quando o usuário faz login, o banco checa se o Id dele está no database do grêmio, gerando uma interface diferente.

## Tabela GRÊMIO
    IdAluno (PK), RM, Nome (completo), Turma (sigla)

## Postagens

Somente os membros do grêmio ou funcionários da escola poderão postar as notícias e avisos. Os posts irão mostrar o autor, a data, os likes, o texto, e a imagem do post. Se o post for feito por um aluno (que tem que ser do grêmio) o autor APARECERÁ anônimo, mostrando apenas que foi o grêmio que poastou, caso seja algum funcionário da diretoria, será mostrado o nome

## Tabela POSTS
    IdPost (PK), Autor (Nome), Aluno (boolean), Data, NumeroLikes, Texto, Imagem (pode ser null)

## Refeitório

O refeitório será atualizado toda segunda feira, dizendo qual refeição terá nos 5 dias da semana. Os itens poderão ser atualizados decorrer da semana, caso os pratos mudem.

Os dias da semana serão armazenados de 1 a 5 (segunda a sexta respectivamente)

## Tabela REFEITÓRIO
    
    IdDia, DiaSem, Café/Lanche(Array), Almoço/Janta(Array)

## Achados e Perdidos

Quem achar o item irá levar para os achados e perdidos e postará que achou o item, quando o dono achar e retirar, o post será deletado. <br>
Antes de ir a público, o post irá para a análise, caso ele esteja adequado, vai a público.

## Tabela AeP ANÁLISE

    IdItem (PK), Autor (id), Foto, Descrição, Tags(array), Data

## Tabela AeP

    IdItem (PK), Autor (id), Foto, Descrição, Tags(array), Data

Também vai ter algumas tags para o produto perdido, se alguém for pesquisar nos achados e perdidos, irá pesquisar usando as tags, o que organiza mais a separação de itens.

## Biblioteca

A tela da biblioteca será conectada com uma API para pegar a capa dos livros, todos os livros vão ser armazenados na tabela da biblioteca, onde também será armazenado se ele está reservado ou não.

## Tabela LIVROS

    IdLivro (PK), Título, Reservado (Boolean), Autor, Descrição, Imagem

Também será necessário uma tabela para cada usuário, com o livro e o prazo de entrega.

## Tabela ALUNOS BIBLIOTECA

    IdAluno, IdLivro, Data de Retirada, Data de Devolução