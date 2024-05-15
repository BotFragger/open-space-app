/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/');
  })

  // skenario 1
  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible')
  });

  // skenario 2
  it('should display alert when username is empty', () => {
    // klik login tanpa mengisi username
    cy.get('button').contains(/^Login$/).click()

    // verifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str)=>{
      expect(str).to.equal('"id" is not allowed to be empty')
    })
  })

  // skenario 3
  it('should display alert when password is empty', ()=>{
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser')

    // klik login tanpa password
    cy.get('button').contains(/^Login$/).click()

    // verifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str)=>{
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  //skenario 4
  it('it should display alert when username and password are wrong', ()=>{
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser')

    // isi password salah
    cy.get('input[placeholder="Password"]').type('wrong_password')

    // klik tombol login
    cy.get('button').contains(/^Login$/).click()

    // verifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str)=>{
      expect(str).to.equal('User ID or password is wrong')
    })
  })

  // skenario 5
  it('should display homepage when username and password are correct', ()=>{
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser')

    // isi password
    cy.get('input[placeholder="Password"]').type('test123456')

    // klik tombol login
    cy.get('button').contains(/Login$/).click()

    // verifikasi elemen homepage ditampilkan
    cy.get('nav').contains(/^Home$/).should('be.visible')
    cy.get('button').contains('Sign out').should('be.visible')
  })
});